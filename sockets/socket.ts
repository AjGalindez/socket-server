import { Socket } from "socket.io";
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuarioConectados = new UsuariosLista();


export const conectarCliente = (cliente: Socket ) => {
    const usuario = new Usuario( cliente.id );
    usuarioConectados.agregar ( usuario );
}


export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect',()=>{
        console.log('Cliente Desconectado...');
        usuarioConectados.borrarUsuario(cliente.id);
    });
}


// Escuchar mensajes
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', ( payload: {de: string, cuerpo: string} ) => {

        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload );

    });

    
}

// Configurando Usuario
export const ConfigurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
    
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {
        
        usuarioConectados.actuarlizarNombre( cliente.id, payload.nombre);

        callback({
            ok:true,
            mensaje: `Usuario ${payload.nombre} configurado`
        })
    });
    
}