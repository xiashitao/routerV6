import { Outlet, Link, useLoaderData, Form, redirect } from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}
export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
  return { contact };
}
export default function Root() {
  const { contacts } = useLoaderData();
  console.log("contacts", contacts);
  // creating Contacts
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form>
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true}>
              <div className="sr-only" aria-live="polite"></div>
            </div>
          </form>
          <Form method="post">
            <button type="submit">new</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`/contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                    {contact.favorite && "⭐️"}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No contacts</p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
