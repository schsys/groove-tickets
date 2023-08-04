const { Client } = require('pg');

async function main() {
  const client = new Client({
    // Replace these values with your database connection information
    host: 'localhost',
    port: 5432,
    user: 'your-username',
    password: 'your-password',
    database: 'your-database'
  });

  await client.connect();

  // Create the trigger function
  await client.query(`
    CREATE OR REPLACE FUNCTION notify_order_dispatch()
      RETURNS TRIGGER AS
    $BODY$
    BEGIN
      IF NEW.status = 'dispatch' AND OLD.status != 'dispatch' THEN
        PERFORM pg_notify('order_dispatch', NEW.id::text);
      END IF;
      RETURN NEW;
    END;
    $BODY$
      LANGUAGE plpgsql;
  `);

  // Create the trigger
  await client.query(`
    CREATE TRIGGER order_dispatch_trigger
      AFTER UPDATE OF status ON orders
      FOR EACH ROW
      EXECUTE FUNCTION notify_order_dispatch();
  `);

  await client.end();
}

main()
  .then(() => console.log('Trigger and trigger function created successfully'))
  .catch(error => console.error('Error creating trigger and trigger function:', error));
