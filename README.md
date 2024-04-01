# Cloud Function Deploy
```
gcloud functions deploy sendToFirestore \
--entry-point writePubFirestore \
--runtime nodejs18 \
--trigger-topic=travel_deals_signup \
--no-gen2
```