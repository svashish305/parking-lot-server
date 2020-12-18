### Parking Lot Design

## APIs:

0. (Just to check rate limiter, although it works for all APIs) (GET 'api/parking-lots/) Gets all generated parking lots' details
1. (POST 'api/parking-lots/') Generate a Parking Slot gibing no of slots as input (else that is configurable via ENV variable PARKING_LOT_SIZE)
2. (POST 'api/parking-lots/park') Park a Car (Takes car number as input)
3. (POST 'api/parking-lots/unpark') Unpark a Card (Takes slot number as input)
4. (GET 'api/parking-lots/info') Retreive Slot/Car information

## All APIs are rate limited by IP, max 10 requests allowed per 10 seconds

## Run Instructions:

```
1. Install dependencies: npm i
2. Start local mongodb service
3. Start the app by 'npm run server'
4. Test all APIs in Postman
```
