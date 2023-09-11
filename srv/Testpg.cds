using {db as db} from '../db/schema';

service TestpgService @(path: '/Testpg') {
    entity Messages as projection on db.Messages;
    function postMessage(msg : String) returns db.MessageID;
}
