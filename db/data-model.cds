namespace my.bookshop;

entity Books {
  key ID    : Integer;
      title : String;
      stock : Integer;
}

@cds.persistence.skip
entity Export {
  key ID      : String;

  // @Core.MediaType                  : 'application/pdf'
  @Core.ContentDisposition.Filename: 'export.xlsx'
  @Core.ContentDisposition.Type    : 'attachment'
  content : LargeBinary;
}
