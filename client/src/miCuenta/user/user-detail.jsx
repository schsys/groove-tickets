import { Show, SimpleShowLayout, TextField } from "react-admin";
export const UserDetail = () => {
  const record = { id: 1, name: "John Doe", email: "john.doe@example.com" };
  return (
    <Show title="User Detail" id={record.id}>
      <SimpleShowLayout>
        <TextField source="userName" />
        <TextField source="role" />
        <TextField source="status" />
      </SimpleShowLayout>
    </Show>
  );
};
