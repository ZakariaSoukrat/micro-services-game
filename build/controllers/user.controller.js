"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUser = exports.addUser = exports.getUser = exports.listUsers = void 0;
const staticUsers = [
    {
        id: 1,
        name: 'Joyce Byers'
    },
];
let nextUserId = 1; // Initialize the next user ID
const listUsers = async (request, reply) => {
    Promise.resolve(staticUsers)
        .then((users) => {
        reply.send({ data: users });
    });
};
exports.listUsers = listUsers;
const getUser = async (request, // Specify the expected params type
reply) => {
    try {
        const userId = parseInt(request.params.userId, 10);
        // Find the user with the specified ID
        const user = staticUsers.find((u) => u.id === userId);
        if (user) {
            reply.send({ data: user });
        }
        else {
            reply.code(404).send({ error: 'User not found' });
        }
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error('Error when trying to get the user:', error);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};
exports.getUser = getUser;
const addUser = async (request, reply) => {
    try {
        const { name } = request.body; // Assuming the user data is sent in the request body
        // Create a new user with an automatically incremented ID
        // Increment the next user ID for the next user
        nextUserId++;
        const newUser = {
            id: nextUserId,
            name,
        };
        staticUsers.push(newUser);
        // Respond with a success message and the updated list of users
        reply.code(201).send({ message: 'User added successfully', data: staticUsers });
    }
    catch (error) {
        // Handle any errors that occur during the user addition process
        console.error('Error when trying to add the user:', error);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};
exports.addUser = addUser;
const putUser = async (request, reply) => {
    try {
        const userId = parseInt(request.params.userId, 10);
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
        }
        else {
            // If the user is not found, return a 404 response
            reply.code(404).send({ error: 'User not found' });
        }
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error('Error updating user score:', error);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
};
exports.putUser = putUser;
//# sourceMappingURL=user.controller.js.map