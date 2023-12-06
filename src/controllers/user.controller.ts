import { FastifyReply, FastifyRequest } from "fastify"
import { IUser } from "interfaces"

const staticUsers: IUser[] = [
  {
	id: 1,
	name: 'Joyce Byers'
  },

]

let nextUserId = 1; // Initialize the next user ID

export const listUsers = async (
 request: FastifyRequest, 
 reply: FastifyReply) => {

  Promise.resolve(staticUsers)
  .then((users) => {
	reply.send({ data: users })
  })
}

export const getUser = async (
  request: FastifyRequest<{ Params: { userId: string } }>, // Specify the expected params type
  reply: FastifyReply
) => {
  try {
    const userId: number = parseInt(request.params.userId, 10);

    // Find the user with the specified ID
    const user = staticUsers.find((u) => u.id === userId);

    if (user) {
      reply.send({ data: user });
    } else {
      reply.code(404).send({ error: 'User not found' });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error when trying to get the user:', error);
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};

export const addUser = async (
  request: FastifyRequest<{ Body: { name: string }  }>,
  reply: FastifyReply
) => {
  try {
    const { name } = request.body; // Assuming the user data is sent in the request body

    // Create a new user with an automatically incremented ID
        // Increment the next user ID for the next user
    nextUserId++;

    const newUser: IUser = {
      id: nextUserId,
      name,
    };

    staticUsers.push(newUser);

    // Respond with a success message and the updated list of users
    reply.code(201).send({ message: 'User added successfully', data: staticUsers });
  } catch (error) {
    // Handle any errors that occur during the user addition process
    console.error('Error when trying to add the user:', error);
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};


export const putUser = async (
  request: FastifyRequest<{ Body: { score: number }; Params: { userId: string }  }>,
  reply: FastifyReply
) => {
  try {
  const userId: number = parseInt(request.params.userId, 10);
  const { score } = request.body; 
  const userIndex = staticUsers.findIndex((u) => u.id === userId);
  // Find the user with the specified ID
  if (userIndex !== -1) {
    // If the user is found, update the score
    staticUsers[userIndex].score = score;

    reply.send({
      message: 'User score updated successfully',
      data: staticUsers[userIndex],
    });
  } else {
    // If the user is not found, return a 404 response
    reply.code(404).send({ error: 'User not found' });
  }
} catch (error) {
  // Handle any errors that occur during the process
  console.error('Error updating user score:', error);
  reply.code(500).send({ error: 'Internal Server Error' });
}
};