import DBLocal from 'db-local'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const { Schema } = new DBLocal({ path: './db' });

const User = Schema('User', {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

export class DataBase {
    static async create({ username, password }) {
        // Validaciones del contenido
        Validation.username(username)
        // Validaciond e la contraseña
        Validation.password(password)

        // Validación de existencia de un usuario
        const user = User.findOne({ username });
        if (user) throw new Error('El usuario ya existe');

        // Creación de id con randomUUID
        const id = crypto.randomUUID();

        // hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        User.create({
            _id: id,
            username,
            password: hashedPassword
        }).save();
        return id;
    }
    static async login({ username, password }) {
        // Implementación del método de login
        // Validaciones del contenido
        Validation.username(username)
        // Validaciond e la contraseña
        Validation.password(password)

        // Verificamos la  existencia del usuario
        const user = User.findOne({ username });
        if (!user) throw new Error('El usuario no existe');

        // Comparamos la contraseña
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) throw new Error('La contraseña es incorrecta')

        // console.log("Validación:", isValid);
        const { password: _, ...publicUser } = user

        return publicUser
    }
}

class Validation {
    static username(username) {
        if (typeof username !== 'string') throw new Error('El usuario debe ser en formato string');
        if (username.length < 3) throw new Error('El usuario debe tener al menos 3 caracteres');
    }
    static password(password) {
        if (typeof password !== 'string') throw new Error('La contraseña debe ser en formato string');
        if (password.length <= 8) throw new Error('La contraseña debe tener más de 8 caracteres');
    }
}