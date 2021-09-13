# blockchain-developer-bootcamp-final-project
Final project for Consensys blockchain developer online bootcamp 2020

# Mailrify - A blockchain based solution for corporate email sender verification

**Problem statement** - In today's world, majority of our communications are done through electronic medium such as emails, sms and instant messages and this trend has accelerated recently because of the COVID pandemic restrictions for face to face  meetings. However, one of the disadvantages is the inability to verify quickly if the person or the organisation behind the message is genuine or fake which led some people to use electronic messaging mediums to organise scams or phishing attempts. Scams and phishing attacks has caused a lot of economic damages to both consumers and employees of many companies. Thus, Mailrify is developed as a smart contract based solution to enable users to verify if the corporate email sender is legitimate to prevent phishing and scams.

**How Mailrify works to protect corporate users against fraudulent emails**

1. Companies can store a registry of employee's email address map to their individual public keys in the smart contract.
2. When the employee wants to send an email, the employee produces a digital signature of the current timestamp by encrypting the data with the private key of the corresponding public key.
3. The recipient receives the email with the digital signature and corresponding public key.
4. The recipient can verify if it is the email is a legitimate company email address by verifying the signature and public key in the email verification portal hosted in the company's website(The only trusted party here to prevent verification using a website with a spoofed identity).

**Proposed advantages of Mailrify compared to manual verification**

1. It is instantaneous and convenient, especially for external parties communicating with a company via email. Normally, company staffers can verify internal email by checking an email address against the company's email directory if there is any. But is is slower and external parties don't have access to the company's email directory and only remember the company email addresses they have communicated before.
2. Prevents sending of email by unauthorised parties. The act of signing off an email with a digital signature and public key requires a second password which acts as a second layer of defence against unauthorised sends.

**Proposed advantages of Mailrify compared to centralized server solutions**

1. The email and verification data is stored permanently in the blockchain and it will never be taken down if the server goes offline no matter if it is an internal or third party solution.
2. Third party solutions may be funded on a subscription basis but a smart contract solution will be funded whenever a user writes to the registry. If the company decides not to renew their subscription, they will lose access to the service.
3. In centralized server solutions, employees with database access can make unauthorised modifications to the registry but in a smart contract solution, only the user with the private key can make modifications.

**Target Audience**
Both corporate employees and end consumers who interact with other companies using email communications.

**Stakeholders in the system**

1) Company administrator - Creates and maintains email registry of the company in the smart contract.
2) Employee - Uses the private key associated with the registered public address to sign messages that can be verified by the receiver of the email.
3) Email receiver - Verifies legitimacy of email by verifying the email digital signature with in the email verification portal hosted in the company's website.

**Use Cases**

1) Registration of company - The company administrator registers the company in the email verification smart contract by entering the name and other required details.
2) Registration of staff - The company administrator register's the staff's email address and the associated public key into the smart contract.
3) Suspension and Termination of account - The company administrator can suspend or terminate a staff's email address in the smart contract.
4) Setting approval requirements - The company administrator can add and modify the list of email addresses required to approve a new email address to prevent unauthorised account creations.
5) Approving new email address - The email address in the list of email address approvals can approve a pending email address under his/her purview.
6) Signing off the email -  The email author produces a digital signature of the current timestamp using the private key associated with the public key pair registered to the email address and includes the public key and digital signature in the email signature before delivering it to the receiver.
7) Verification of the email -  The email receiver verifies the public key and digital signature in the email signature in the email verification portal hosted in the company's website.

**Outcomes of this solution**

The hopeful outcome of this solution is the reduction of phishing and scam attempts via email by a public who is more likely to verify the source every incoming corporate email because the barriers to do so are significantly lowered.
