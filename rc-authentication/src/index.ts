import {app} from './app'

const server = app.listen( app.get('port'), _ => console.log('App running on port ' + app.get('port')))

export {server}