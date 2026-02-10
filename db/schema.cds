using {managed} from '@sap/cds/common';

// Namespace for sales-related entities
namespace sales;

// Entity representing sales order headers
// Includes managed aspect for tracking creation and modification details
entity SalesOrderHeaders : managed {
  key id          : UUID;
      customer    : Association to Customers;
      totalAmount : Decimal(15, 2);
      items       : Composition of many SalesOrderItems // Composition to represent the relationship with sales order items
                      on items.header = $self;
}

entity SalesOrderItems {
  key id       : UUID;
      header   : Association to SalesOrderHeaders; // Associations to link to sales order headers and products
      product  : Association to Products; // Association to link to products being ordered
      quantity : Integer;
      price    : Decimal(15, 2);
}

entity SalesOrderLogs : managed {
  key id        : UUID;
      header    : Association to SalesOrderHeaders;
      userData  : LargeString;
      orderData : LargeString;
}

entity Customers {
  key id        : UUID;
      firstName : String;
      lastName  : String;
      email     : String;
}

entity Products {
  key id    : UUID;
      name  : String;
      price : Decimal(15, 2);
      stock : Integer;
}
