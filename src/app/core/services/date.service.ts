import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class DateService {
  constructor() {}

  StringToDate(valor: string) {
    return new Date(
      parseInt(valor.substr(6), 10),
      parseInt(valor.substr(3, 5), 10) - 1,
      parseInt(valor.substr(0, 2)),
      10
    );
  }

  // parâmetro: yyyy-MM-dd
  ISOStringToDate(valor: string) {
    return new Date(
      parseInt(valor.substr(0, 4)),
      parseInt(valor.substr(5, 2)) - 1,
      parseInt(valor.substr(8, 2))
    );
  }

  StringToDateTime(valor: string) {
    return new Date(
      parseInt(valor.substr(6, 10), 10),
      parseInt(valor.substr(3, 5), 10) - 1,
      parseInt(valor.substr(0, 2), 10),
      parseInt(valor.substr(11, 13), 10),
      parseInt(valor.substr(14, 16), 10),
      parseInt(valor.substr(17), 10)
    );
  }

  DefaultStringDateTimeToDate(valor: string) {
    var vet = valor.split("T");
    return vet[0];
  }

  DefaultStringToBrString(valor: string) {
    const date = new Date(valor);
    return this.DateToString(date);
  }

  DefaultStringToDatePick(valor: string) {
    const date = new Date(valor);
    return this.DateToDatePick(date);
  }

  DateToString(valor: Date) {
    return (
      valor.getDate().toString().padStart(2, "0") +
      "/" +
      (valor.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      valor.getFullYear()
    );
  }

  DateToShortString(valor: Date) {
    return (
      valor.getDate().toString().padStart(2, "0") +
      "/" +
      (valor.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      valor.getFullYear().toString().substring(2)
    );
  }

  DateToStringYYYYMMDD(valor: Date) {
    return (
      valor.getFullYear() +
      "-" +
      (valor.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      valor.getDate().toString().padStart(2, "0")
    );
  }

  DateTimeToString(valor: Date) {
    return (
      valor.getDate().toString().padStart(2, "0") +
      "/" +
      (valor.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      valor.getFullYear() +
      " " +
      valor.getHours().toString().padStart(2, "0") +
      ":" +
      valor.getMinutes().toString().padStart(2, "0") +
      ":" +
      valor.getSeconds().toString().padStart(2, "0")
    );
  }

  DateToStringAnoMesDia(valor: Date) {
    return (
      valor.getDate().toString().padStart(2, "0") +
      "/" +
      (valor.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      valor.getFullYear()
    );
  }

  DatePickToString(valor: any) {
    return (
      valor.day.toString().padStart(2, "0") +
      "/" +
      valor.month.toString().padStart(2, "0") +
      "/" +
      valor.year.toString().padStart(2, "0")
    );
  }

  DatePickToDate(valor: any) {
    return new Date(valor.year, valor.month - 1, valor.day);
  }

  DateToDatePick(valor: Date) {
    const data = {
      year: valor.getFullYear(),
      month: valor.getMonth() + 1,
      day: valor.getDate(),
    };
    return data;
  }

  DateNowToString(mostraHoras: boolean) {
    const data = new Date(Date.now());
    if (mostraHoras) {
      return this.DateTimeToString(data);
    } else {
      return this.DateToString(data);
    }
  }

  DateNowToYYYYMMDD() {
    const data = new Date(Date.now());

    var retorno =
      data.getFullYear().toString() +
      "-" +
      (data.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      data.getDay().toString().padStart(2, "0");
    return retorno;
  }

  DateNowToYYYYMM01() {
    const data = new Date(Date.now());

    var retorno =
      data.getFullYear().toString() +
      "-" +
      (data.getMonth() + 1).toString().padStart(2, "0") +
      "-01";
    return retorno;
  }
  DateNowToDateTime() {
    const data = new Date(Date.now());
    return data;
  }

  StringToDatePick(valor: string) {
    const data = this.StringToDate(valor);
    return this.DateToDatePick(data);
  }

  DatePickToDateTimeString(valor: any) {
    return new String().concat(
      valor.year,
      "-",
      valor.month.toString().padStart(2, "0"),
      "-",
      valor.day.toString().padStart(2, "0"),
      "T",
      "00:00:00"
    );
  }

  DefaultStringToDate(valor: string) {
    return new Date(valor);
  }

  ShortDateStringToDate(value: string) {
    if (value == null || value == "") return null;
    let vet = value.split("-");
    return new Date(parseInt(vet[0]), parseInt(vet[1]) - 1, parseInt(vet[2]));
  }

  DatePickerStringToDate(value: string) {
    if (value == null || value == "") return null;
    let vet = value.split("-");
    return new Date(parseInt(vet[0]), parseInt(vet[1]) - 1, parseInt(vet[2]));
  }

  GetValidWeekDay(value: string) {
    var date = new Date();
    if (value == undefined || value == "") {
      return date;
    }

    if (value.split("-").length > 0) {
      date = this.ShortDateStringToDate(value);
    } else {
      if (isNaN(Date.parse(value)) == false) {
        date = new Date(Date.parse(value));
      }
    }

    if (date.getDay() == 6 || date.getDay() == 0)
      date.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7));

    return date;
  }

  MesAnoStringFormat(valor: string) {
    return valor.slice(0, 2) + "/" + valor.slice(2);
  }

  LesserThanDateNow(valor): boolean {
    var today = new Date();
    return new Date(valor) < today;
  }

  TwoDatesStringCompareGreaterThan(date1: string, date2: string): boolean {
    if (
      date1 == undefined ||
      date1 == "" ||
      date2 == undefined ||
      date2 == ""
    ) {
      return false;
    } else {
      return this.TwoDatesCompareGreaterThan(new Date(date1), new Date(date2));
    }
  }

  TwoDatesCompareGreaterThan(date1: Date, date2: Date): boolean {
    return date1 > date2;
  }

  TwoDatesStringCompareGreaterOrEqualThan(
    date1: string,
    date2: string
  ): boolean {
    if (
      date1 == undefined ||
      date1 == "" ||
      date2 == undefined ||
      date2 == ""
    ) {
      return false;
    } else {
      return this.TwoDatesCompareGreaterOrEqualThan(
        new Date(date1),
        new Date(date2)
      );
    }
  }

  TwoDatesCompareGreaterOrEqualThan(date1: Date, date2: Date): boolean {
    return date1 >= date2;
  }

  // parâmetro: yyyy-MM-dd
  // retorno: dd/MM/yyyy
  ISOStringToBrDate(value: string) {
    if (value == null || value == "") {
      return null;
    }

    let vet = value.split("-");
    if (vet.length != 3) {
      return null;
    }

    return vet[2] + "/" + vet[1] + "/" + vet[0];
  }

  DiferencaEmDias(date1: Date, date2: Date): number {
    let difMilissegundos: number;
    if (date1 < date2) {
      difMilissegundos = new Date(date2).getTime() - new Date(date1).getTime();
    } else {
      difMilissegundos = new Date(date1).getTime() - new Date(date2).getTime();
    }

    return Math.ceil(difMilissegundos / (1000 * 3600 * 24));
  }

  DiaDaSemana(data: Date): string {
    const datepipe: DatePipe = new DatePipe("pt-BR");
    return datepipe.transform(data, "EEEE");
  }
}
