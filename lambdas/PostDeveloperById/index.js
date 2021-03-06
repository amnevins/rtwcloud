const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB.DocumentClient();

exports.PostDeveloperById = (event, context, callback) => {

    console.log(JSON.stringify(event));
    console.log(event.requestContext.authorizer.claims);
    const pathParam = event.pathParameters.id;
    const userId = event.requestContext.authorizer.claims.sub;


    if (pathParam !== userId) {
        return context.succeed({
            statusCode: 403,
            body: JSON.stringify({
                message: 'Forbidden.'
            }),
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin' : '*'
            }
        });
    }

    const params = {
        Item: {
            userId: event.requestContext.authorizer.claims.sub,
            username: event.requestContext.authorizer.claims["cognito:username"],
            name: event.requestContext.authorizer.claims.name,
            email: event.requestContext.authorizer.claims.email,
            picture: " ",
            created: new Date().toString(),
            updated: " ",
            city: " ",
            state: " ",
            title: " ",
            employer: " ",
            github: " ",
            codepen: " ",
            linkedin: " ",
            website: " ",
            resume: " ",
            bio: " ",
            experience: " ",
            timeWithRT: " ",
            rank: " ",
            skillsProfessional: [],
            skillsSoftware: [],
            skillsLanguages: [],
            lessonsAttending: []
        },
        TableName: process.env.TABLE
    };

    dynamodb.put(params, function (err, data) {
        if (err) {
            return context.succeed({
                statusCode: 501,
                body: JSON.stringify({
                    message: 'There was an error when calling DynamoDB'
                }),
                headers: {
                    'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        } else {
            return context.succeed({
                statusCode: 200,
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
    });

};