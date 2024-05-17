import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { google } from 'googleapis';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid'
import * as nodemailer from 'nodemailer';
import { format } from 'date-fns'

@Injectable()
export class GoogleService {

  constructor(
    @InjectRepository(Usuario) private readonly repositoryUsuario: Repository<Usuario>) {
  }

  private readonly auth = new google.auth.OAuth2(
    process.env.CLIENTIDGOOGLE,
    process.env.CLIENTSECRETGOOGLE,
    process.env.REDIRECTURL
  );

  async getAuthUrl() {
    const scopes = ['email', 'profile', 'https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events', 'https://mail.google.com/'];
    return this.auth.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
  }

  async getUserInfo() {
    const oauth2 = google.oauth2({ version: 'v2', auth: this.auth });
    const { data } = await oauth2.userinfo.get();
    return data;
  }

  async getAccessToken(code: string) {
    const { tokens } = await this.auth.getToken(code);
    this.auth.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: this.auth });
    const { data } = await oauth2.userinfo.get();
    const { access_token, id_token, refresh_token } = tokens;
    // return { access_token, id_token, refresh_token, name: data.name, picture: data.picture };
    return { data, tokens };
  }

  async createEvent(date: string, dateTime: string, attendees: string[], conferenceDataVersion: string) {
    const calendar = google.calendar({ version: 'v3', auth: this.auth });
    let startDateTime = date + 'T' + dateTime; //format: AAAA-MM-DDThh:mm:ss
    let [hours, minutes] = dateTime.split(':').map(Number);
    let endHours = minutes + 20 === 60 ? hours + 1 < 10 ? '0' + (hours + 1).toString() : (hours + 1).toString() : hours.toString();
    let endMinutes = minutes + 20 === 60 ? '00' : (minutes + 20).toString();
    let endDateTime = date + 'T' + endHours + ':' + endMinutes + ':00';
    let eventSummary = conferenceDataVersion == '0' ? ' - Presencial' : ' - Remota';
    const event = {
      colorId: '10',
      summary: 'Asesoria PPI' + eventSummary,
      description: 'Asesoria PPI',
      start: {
        dateTime: startDateTime,
        timeZone: 'America/Bogota',
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'America/Bogota',
      },
      conferenceData: {
        createRequest: {
          conferenceSolutionKey: { type: 'hangoutsMeet' },
          requestId: v4(),
        },
      },
      attendees: attendees.map(email => ({ email })),
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 30 },
          { method: 'popup', minutes: 15 },
        ],
      },
    };

    const calendarResponse = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: conferenceDataVersion.toString() === '1' ? 1 : 0,
    });

    const eventId = calendarResponse.data.id;
    const htmlLink = calendarResponse.data.htmlLink;
    const meetLink = calendarResponse.data.hangoutLink;
    return { eventId, htmlLink, meetLink };
  }


  async deleteEvent(eventId: string, cause: string) {
    const calendar = google.calendar({ version: 'v3', auth: this.auth });
    const eventInfo = await this.getEventDetails(eventId);
    // Get the event to retrieve attendees
    const event = await calendar.events.get({
      calendarId: 'primary',
      eventId: eventId,
    });
    console.log(eventId, eventInfo.attendees, eventInfo.eventDate, cause);
    // Delete the event
    try{
      await calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId,
        sendNotifications: true, // Send notifications to attendees
        sendUpdates: 'all', // Send updates to all attendees
      });
    }catch (error){
      console.log('Error deleting event:', error);
    }
    await this.sendEmail(eventInfo.attendees, eventInfo.eventDate, cause)
    return { message: 'Evento eliminado y notificaciones enviadas.' };
  }

  async revokeAccess() {
    await this.auth.revokeCredentials();
  }

  async isSessionActive() {
    return !!this.auth.credentials.access_token;
  }

  async getEventDetails(eventId: string) {
    const calendar = google.calendar({ version: 'v3', auth: this.auth });
    const event = await calendar.events.get({
      calendarId: 'primary',
      eventId: eventId,
    });
    const attendees = event.data.attendees.map(attendee => attendee.email);
    const userName = event.data.creator.email;
    const eventDate = event.data.start.dateTime;
    return { attendees, userName, eventDate };
  }

  async sendEmail(recipient: string[], dateDay: string, cause: string) {
    // Get the active session id_token
    const idToken = this.auth.credentials.id_token as string;
    // Decode the JWT tokken
    const base64Url = idToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
    // Get the email driection
    const userEmail = decodedData.email;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: userEmail,
        clientId: process.env.CLIENTIDGOOGLE,
        clientSecret: process.env.CLIENTSECRETGOOGLE,
        refreshToken: this.auth.credentials.refresh_token,
        accessToken: this.auth.credentials.access_token,
      },
    });

    const mailOptions = {
      from: userEmail,
      to: recipient,
      subject: 'Cancelación de asesoría',
      text: 'Cancelación de asesoría',
      html: `
      <table style="width: 100%; height: 100%; overflow: auto;">
      <tbody
          style="width: 500px; height: 450px; background-color:#fff; border-radius: .5rem; border: 1px solid #0f5223;">
          <tr
              style="width: 490px; height: 100px;">
              <td
                  style="width: 490px; height: 100px;">
                  <table style="width: 488px; height: 100px;">
                      <tbody>
                          <tr style="width: 490px; height: 100px;">
                              <td>
                                  <div
                                      style="width: 484px; height: 90px; background-color: #0f5223; border-radius: .5rem; overflow: hidden;">
                                      <img src="https://www.politecnicojic.edu.co/images/logo/logo.png"
                                          style="width: 300px; object-fit: scale-down; margin: 0 10px;" alt="">
                                      <p
                                          style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; text-align: center; color: #fff; align-content: center; margin: 15px;">
                                          Sistema Gestor del PPI
                                      </p>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                      <tr style="width: 484px; height: 10px;">
                          <td>
                              <hr style="border-top: 1px solid #5e636e; width: 480px; margin: 2px 0;">
                          </td>
                      </tr>
                      <tr
                          style="background-color: #f0f0f0; width: 490px; height: 330px; border-radius: 0 0 .5rem .5rem;">
                          <td>
                              <table style="width: 480px; height: 330px;">
                                  <tr style="width: 480px; height: 25px;">
                                      <td style="width: 480px; height: 25px;">
                                          <p
                                              style="width: 480px; height: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 20px; font-weight: bold; text-align: center; margin: 0;">
                                              Cancelacion de asesoria
                                          </p>
                                      </td>
                                  </tr>
                                  <tr style="width: 480px; height: 250px;">
                                      <td style="width: 480px; height: 250px; align-items: start; align-content: start;">
                                          <p
                                              style="width: 480px; height: 250px; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; text-align: center; align-content: start;; margin: 0;">
                                              El sistema de gestión del PPI, le informa que: ${userEmail}, ha cancelado la cita de asesoría programada para el día ${format(dateDay, "dd/MM/yyyy")}, bajo el motivo: ${cause}
                                          </p>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </tbody>
  </table>
    `,
    };
    await transporter.sendMail(mailOptions);
  }
}