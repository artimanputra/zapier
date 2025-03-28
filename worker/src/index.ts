import {Kafka} from "kafkajs";

const TOPIC_NAME = "zap-events"

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
})

async function main() {
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2090384745.
const consumer= kafka.consumer({groupId: 'main-worker'})
await consumer.connect();
await consumer.subscribe({topic: TOPIC_NAME, fromBeginning: true});

// Suggested code may be subject to a license. Learn more: ~LicenseLog:2360767004.
await consumer.run({
    autoCommit: false,
    eachMessage: async ({topic, partition, message}) => {
        console.log({
            partition: partition.toString(),
            offset: message.offset,
            topic: topic.toString(),
            value: message.value.toString(),
        })
        await new Promise(resolve => setTimeout(resolve, 1000));

        await consumer.commitOffsets([
            {
                topic: TOPIC_NAME,
                partition:partition,
                offset:parseInt(message.offset+1).toString()//
            }
        ])
    }
})
}
main();