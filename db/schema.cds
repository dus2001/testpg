namespace db;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity Messages : cuid, managed {
    token : String not null;
    updsrc: String;
}
type MessageID : UUID;