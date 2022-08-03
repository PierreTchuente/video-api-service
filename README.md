# video-api-service
video-api-service is a nodejs api runing on kubernetes that can scale on demand.

## Installation
To locally install this node application,please follow the steps bellow. (It is consider that you are running Docker and kubernetes cluster locally.)
1. Clone the video-api-service git repository (`https://github.com/PierreTchuente/video-api-service.git`) and navigte to the root folder of the repo.
2. Build the docker image with this command: `docker build -t ${IMAGE_PATH} -f Dockerfile .`  ${IMAGE_PATH} in this case is `pierrearmand/video-api-service:master`
3. Install helm (read more [here](https://helm.sh/)). it is a package manager for kubernetes.
5. run the folling command `helm3 upgrade --install video-api-service  charts/video-api-service --set image.tag=master,image.pullPolicy=IfNotPresent` to deploy it locally.


NB: A Loadbancer, HPA and a Container running the video-api-service will be deployed. for now, the kubernetes `Metrics API not available` in my 
local cluster. 

#### Loadbancer:
receives request from clients (web brower, mobile app and etc) and distribute to the appropriate service(s)
#### HPA
kubernetes object responsible for scaling up and down containers base on resource metrics
#### Container or Pod
running instance of the application

```
NAME                                                    REFERENCE                      TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
horizontalpodautoscaler.autoscaling/video-api-service   Deployment/video-api-service   <unknown>/90%   2         10        2          4h28m

NAME                        TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
service/video-api-service   LoadBalancer   10.111.76.152    localhost     5000:30528/TCP   4h28m

NAME                                READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/video-api-service   2/2     2            2           4h28m

```

## Scalability
The minimum number of pods (containers) replicas running when the service is deployed is 2 and the maximum number is 10.
The containers have the following resources w:
 1. CPU:  2 * 30m
 2. Memory: 2 * 105MI
The Horizontal scalling is based on the cpu utilisation. When the sum of running container cpu utilisation reach 90%, the kubernetes HPA
Will automatically spawn 1 more container to handle the extra load. And this will go on aintill the maximum number of Replicas set is reached.
The whole application can be monitor over time to reach set the correct metrics and maximum container(s) replicas.

## Work to be done
1. Add redis or memcache container for managing user session
2. Store the user information (user_id, device_id, location_id, video_id etc.., and the number of video currently being watched by the user on that device)
3. if user login with another device add the new device to the session and increase the number the video being streamed.
4. make sure the number of video on different devices do not exceed 3.
5. Add unit and integration tests.