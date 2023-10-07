---
title: "SSHing to AWS EC2 instance using its private IP"
description: "Wanted to SSH into your EC2 instance using its private IP? Here, I will guide you to do the same by creating a small script using aws-cli."
date: 2019-05-31T01:00:00+05:30
tags: ["aws", "ec2", "aws-cli"]
draft: false
originUrl: "https://medium.com/@aswathkk/how-to-ssh-to-ec2-instance-with-private-ip-cf868f7e9a1d"
---

Last day, I was just experimenting with [aws-cli](https://github.com/aws/aws-cli). When I got into the section of ec2, I came to know that we can filter and list the ec2 instances in our account. The result was having every detail about our ec2 instance. So, I decided to make use of it in my utility script that I use to connect to ec2 instances.

In our workplace, most of the time we do our development and experiments in AWS ec2 instances. We rarely use our local machine for development. In such an environment, it is usual for us to stop some ec2 instances and restart it later point of time. So, whenever we restart an instance, its public IP will change. Every time we need to get the new public IP in order to SSH into it.

One solution for this is assigning AWS Elastic IPs to all the instances. Even though AWS tells that Elastic IPs are free, they will charge when the instances are in the stopped state. We make use of them only in our production machines where we are sure that those instances won’t be stopped for a long time. So, in the case of our development machine, choosing the Elastic IP is not the best option.

# Using aws-cli to get public IP of an ec2 instance

We can access all the details of our ec2 instances from aws-cli. To get the details of all of our ec2 instances, just run:

```
aws ec2 describe-instances
```

It will throw you too much information about all of your instances. We need to filter them using the `--filter` flag. We can filter the ec2 instance using their private IP as follows:

```
aws ec2 describe-instances \
--filters="Name=network-interface.addresses.private-ip-address,Values=$PRIVATE_IP"
```

The above command will also give you a lot of information about the filtered ec2 instance. We only need the public IP of the instance. So, we will use the `--query` flag to extract only the public IP.

```
aws ec2 describe-instances \
--filters="Name=network-interface.addresses.private-ip-address,Values=$PRIVATE_IP" \
--query "Reservations[*].Instances[*].PublicIpAddress"
```

This will give us a JSON array like this:

```
[
  [
    "YOUR_PUBLIC_IP"
  ]
]
```

Now, we will use [jq](https://stedolan.github.io/jq/) to parse the required field. Finally, our command to retrieve public IP will look like this:

```
aws ec2 describe-instances \
--filters="Name=network-interface.addresses.private-ip-address,Values=$PRIVATE_IP" \
--query "Reservations[*].Instances[*].PublicIpAddress" \
| jq -r '.[0][0]'
```

I wrapped the above code snippet into a function named `get_public_ip` and added it to my `.bashrc`

```
function get_public_ip {
    PUBLIC_IP="$1"
    aws ec2 describe-instances \
        --filters="Name=network-interface.addresses.private-ip-address,Values=$PRIVATE_IP" \
        --query "Reservations[*].Instances[*].PublicIpAddress" \
    | jq -r '.[0][0]'
}
```

Now, I can SSH into my ec2 instance using its Private IP making use of the above function in the SSH command.

```
ssh -i /path/to/key_file username@$(get_public_ip 172.x.x.x)
```

Enjoy !!!
