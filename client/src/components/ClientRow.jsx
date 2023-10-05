import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id }, // passing id as parameter to query

    // now to be able to get the updated data after deleting a record we can achieve it in two ways

    // first we can call the get clients again by using refetch
    // refetchQueries: [{ query: GET_CLIENTS }],

    // another is to update the cache
    // update(cache, { data: { deleteClient } }) {
    //   // deleteClient is the client that is sent back after its deletion from the api
    //   // so in this method we are basically trying to updating the cache by stating that the client data is changed(ie removed)
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS }); // readQuery helps we get the data from the client, here we are getting the clients from cache
    //   cache.writeQuery({
    //     // here we are actually updating the client by removing the deleted client
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },

    // since we also want to update the projects as after deleting the client, its associated projects are also deleted so we will simply refetch both client and projects here
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
