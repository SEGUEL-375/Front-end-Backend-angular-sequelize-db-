import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Usuario = db.define('usuarios', {
    
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.NUMBER
    },
    date_joined: {
        type: DataTypes.NUMBER
    }
}, {
    createdAt: false,
    updatedAt: false
});

export default Usuario;