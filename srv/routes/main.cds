// using {sales} from '../db/schema';
using {sales} from '../../db/schema';

// CDS service with role-based access control to all entities
@requires: ['authenticated-user']
// @restrict: ['authenticated-user']
// CDS service definition
service MainService {
  entity SalesOrderHeaders as projection on sales.SalesOrderHeaders;
  entity SalesOrderLogs    as projection on sales.SalesOrderLogs; // Not recommended for production
  entity Customers         as projection on sales.Customers;
  entity Products          as projection on sales.Products;
};
