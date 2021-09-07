FROM python:3.9

WORKDIR /opt/api
ADD . .

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

RUN pip install -r requirements.txt

RUN ["chmod", "+x", "/opt/api/scripts/run.sh"]

CMD ["sh", "./scripts/run.sh"]
