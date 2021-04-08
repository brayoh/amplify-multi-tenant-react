import * as moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { DynamoDB } from "aws-sdk";

const ddb = new DynamoDB({ apiVersion: "2012-10-08" });

export const cognitoPostConfirmation = async (event, context, callback) => {
  try {
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
        id: { S: uuidv4() },
        cognitoId: { S: event.request.userAttributes.sub },
        email: { S: event.request.userAttributes.email },
        phoneNumber: { S: event.request.userAttributes.phone_number },
      },
    };

    // @ts-ignore
    await ddb.putItem(userParams).promise();

    return callback(null, event);
  } catch (error) {
    return callback(error);
  }
};
