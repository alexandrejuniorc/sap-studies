namespace sap.cap.escola;

entity Estudantes {
  key email      : String(255);
      first_name : String(255);
      last_name  : String(255);
      created_at : Date;

}
