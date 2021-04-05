import moment from "moment";
import { DynamoDB, Lambda } from "aws-sdk";
import * as uuid from "uuid/v4";

const ddb = new DynamoDB({ apiVersion: "2012-10-08" });

export const cognitoPostConfirmation = async (event, context, callback) => {
  try {
    const userId = uuid();

    const userParams = {
      TableName: process.env.PRIMARY_TABLE,
      Item: {
        createdAt: {
          S: moment().format("YYYY-MM-DDThh:mm:ssZ"),
        },
        updatedAt: {
          S: moment().format("YYYY-MM-DDThh:mm:ssZ"),
        },
        typeName: { S: "USER" },
        id: { S: userId },
        cognitoId: { S: event.request.userAttributes.sub },
        email: { S: event.request.userAttributes.email },
        phoneNumber: { S: event.request.userAttributes.phone_number },
      },
    };

    await ddb.putItem(userParams).promise();

    return callback(null, event);
  } catch (error) {
    return callback(error);
  }
};
