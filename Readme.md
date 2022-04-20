# Create cluster
gcloud container clusters create-auto mycluster \
    --region asia-south1 \
    --project=<your project> 

# Create Artifact Repository and authenticate
```
gcloud artifacts repositories create kafka-keda --repository-format=docker \
--location=asia-south1 --description="Docker repository"

gcloud auth configure-docker <region>-docker.pkg.dev

```
# Build and Push 
```
docker build -t kafka-keda .

docker tag kafka-keda <region>-docker.pkg.dev/<project=id>/kafka-keda/kafka-keda:v3

docker push <region>-docker.pkg.dev/<project=id>/kafka-keda/kafka-keda:v3
```

Make sure to change image name, API username , password and broker host in  your deployment.yaml and keda-config.yaml

# Deploy
```
kubectl apply  -f https://github.com/kedacore/keda/releases/download/v2.6.1/keda-2.6.1.yaml
kubectl apply   -f deployment.yaml 
kubectl  apply  -f keda-config.yaml
```

Data generator is available [here](https://github.com/skamalj/datagenerator)

Confluent account can be created [here](https://login.confluent.io/)
