# Restart VM
VM_NAME="instance-20240725-092624"
VM_ZONE="us-central1-c"
SSH_KEY_PATH="/builder/home/.ssh/id_rsa"


VM_STATUS=$(gcloud compute instances describe --zone=$VM_ZONE $VM_NAME --format="value(status)")
if [ "$VM_STATUS" = "TERMINATED" ]; then
    gcloud compute instances start $VM_NAME --zone=$VM_ZONE 
fi
echo "VM Status: "$VM_STATUS

TIMEOUT=300  # Adjust this to your desired timeout in seconds
ELAPSED=0
while [ "$VM_STATUS" != "RUNNING" ] && [ $ELAPSED -lt $TIMEOUT ]; do
    sleep 10  # Adjust the sleep duration as needed
    ELAPSED=$((ELAPSED + 10))
    VM_STATUS=$(gcloud compute instances describe $VM_NAME --zone=$VM_ZONE  --format="value(status)")
done

if [ "$VM_STATUS" != "RUNNING" ]; then
    echo "VM did not start within the specified timeout."
    exit 1
else
    echo "VM Status: "$VM_STATUS
fi

set -x
gcloud compute scp --zone=$VM_ZONE docker-compose.prod-run.yml cloud_build@$VM_NAME:docker-compose.yml
gcloud compute scp --zone=$VM_ZONE cloud_build/app-restart.sh cloud_build@$VM_NAME:app-restart.sh
gcloud compute ssh --zone=$VM_ZONE cloud_build@$VM_NAME  --command "sudo bash app-restart.sh"
