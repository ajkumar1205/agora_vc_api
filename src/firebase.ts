import fire from "firebase-admin";

const serviceAccount = {
    type: "service_account",
    project_id: "agora-vc-test",
    private_key_id: "a8a3e89c16a80ec1409464154808f6cf4fd91a15",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCmoaUB3A2Z8B4G\n9WO+lsb6Uwjkrk4F38nxN4uf4/ruhjLDiKm3cbobEbtUHAAtqbzhsO8l8hITozPm\nkl9fzdoSvZoqpos2gNuRUhaTw+PBsFNrP+ziJYJvOGJmxSB1SFfw0wbxia2Anb2A\nzeF8oAOboJzMLQMvjoAwZh/Ok3ia4vlNK5uDrJMZeg7ZPQb83dUQoFIA1zthtOb9\n+Mt3UprAr8pVQyFnLrNgXaVBJKyBIYg9RT4NGEnsP6DKLuJlkWsix0fMnYclaft8\n6y3vthYhuINcp+XbZ1kvrrKGPGYDHbQGHVBJNNwXL0/BZtnCROYAT3FUKNCBmZgc\ny5FExr1hAgMBAAECggEAKJKkYGsJ3skyLoSSmGYTJgGQ4Um10sVWYQci1rhGscx4\nUNcWaAXniE7Ne6HjwzqYtKWF3YnvL9vlt8c9NNElP7nt72Ok8wz2KZDA0ZL5goBi\nF3O1xKzYcSdcAmUOTbBjRU7E2owo9G+0JEg9FsDJkBvQAgEVzP8YJHDBXuXWkHO9\nTiGKrbI4dHHPKTCsPB7AmLfvN9LrUN8K8ZXRzfSfAJNz0CFx9PIZWOokDJCmhPeK\nNmspDU+i7Xuz7jDUNTVXb+cv1enSCiKoT4YkwWDrSKQYXNUa6zpW3/gHK/wnH/l5\nU5oEATsXLn0veY0xYcByiWGzzra2l0nQwDoTzM589wKBgQDrHQ90gMD3jwb5MQ4q\nGxTbg8DQCoYi6w4kqU/Rerqp2cxn0LkXwJnyZsu7jOkGD6Gom9ht1VlBhQVbRDfG\n2hOP92a6hP13TfO+1mBrnFzYjAs2Zr7lM8SWGPQJnr42hKxbPhyvYkMId18HKYO1\nz8hEi1CDoX+8e4DFmOA6a89ZbwKBgQC1byr8oYsVs+IlWsvRIlMfTpppxAl6pct9\n29jRPffmjR9cpx95Jgv4Q/nOMheVw+KpPR7jBzbb+rSMvPiiHiT2MHXuzyqx44fg\nay1UmAAKgQg0vtQQG0Za3vuMxfmE9Xo0nKp2QcSzP76a7Z/ToXlxDRmatfcEMJI/\njFo5sSLOLwKBgEBEL0dPMm/43pUa/Z4wzOC8AOZdGhFNYw5OYY0HGSL4b9Eo0o9V\njD8gLixT9hY8C5pFD0HmgYFRVQd/fCeU0KgXnjL5yzbjTe8qNiz0DsT6cs4qA6Av\nKFtG8t32UFQiq+I89iZSm7QivQz+Igx+gWWLFzUD3iCtOaPJh/EwKvttAoGBAJff\nfaFJbE53bEcOkOv4CpJ7TqBYPAMRg5xQCldkwv2Xhfgd4SedJInmBNaIcduoxDQc\neJ1b7Z0IaFgi2xGBoDkAacfEXJ3Zs2S08pYMQoSIbCES2Bq/ag4o93JoSiz0+x3N\nQpeJCClvo5K2dIJHeYubhqJNzX8RVWqihugiEdt7AoGBAI3xVuQ7n/YfnnPfpSU+\nJpaXD8coZD8ipANwLC3VTJ+HQ/dmTmv3gMklwWhuFqAO5JeMnhy2VoQosra/M5ER\n1A3S4rKn4rD7Fx6hFXZoA0MKiw8LikCfZjQITHJfLBIAY7EmhCgMk2m8c9mEmiRD\nqropA4eix+AllOc14lgom5cZ\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-fbsvc@agora-vc-test.iam.gserviceaccount.com",
    client_id: "101666736939755696666",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40agora-vc-test.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
};

export const admin = fire.initializeApp({
    credential: fire.credential.cert(serviceAccount.toString())
});


