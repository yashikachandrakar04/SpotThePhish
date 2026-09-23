// Categories: 'banking', 'social', 'work', 'shopping', 'tech', 'delivery', 'government', 'crypto'

export const emails = [
  // ============ BANKING ============
  {
    id: 'bank-1',
    category: 'banking',
    difficulty: 'easy',
    sender: 'PayPal Security',
    senderEmail: 'security@paypa1-verify.com',
    subject: 'URGENT: Your account will be suspended!',
    body: `Dear Valued Customer,

We have detected suspicious activity on your account. Your account will be SUSPENDED within 24 hours unless you verify your information immediately.

Click here to verify: http://paypa1-verify.com/login

Failure to act will result in permanent account closure.

PayPal Security Team`,
    isPhishing: true,
    redFlags: [
      {
        text: 'paypa1-verify.com',
        reason: 'Suspicious sender domain (paypa1 uses "1" instead of "l")',
      },
      {
        text: 'SUSPENDED within 24 hours',
        reason: 'Urgency tactic to pressure you',
      },
      {
        text: 'Dear Valued Customer',
        reason: 'Generic greeting — real companies use your name',
      },
      { text: 'permanent account closure', reason: 'Threatening language' },
      {
        text: 'http://paypa1-verify.com/login',
        reason: 'Link goes to a fake PayPal domain',
      },
    ],
    explanation:
      'Classic PayPal phishing. The sender domain is misspelled (paypa1 instead of paypal), uses extreme urgency, and threatens account suspension.',
  },
  {
    id: 'bank-2',
    category: 'banking',
    difficulty: 'medium',
    sender: 'Chase Bank',
    senderEmail: 'alerts@chase.com.secure-notify.net',
    subject: 'Unusual transaction on your account',
    body: `Dear Chase Customer,

We've noticed a transaction of $1,299.00 at an electronics store in a different state. If you did not authorize this transaction, please verify your identity immediately.

Verify Now: https://chase.com.secure-notify.net/verify

You have 24 hours to respond or the transaction will be processed.

Chase Fraud Prevention`,
    isPhishing: true,
    redFlags: [
      {
        text: 'chase.com.secure-notify.net',
        reason:
          'Subdomain trick — real domain is secure-notify.net, not chase.com',
      },
      { text: 'Dear Chase Customer', reason: 'Generic greeting' },
      { text: 'You have 24 hours', reason: 'Artificial time pressure' },
      {
        text: '$1,299.00 at an electronics store',
        reason: 'Vague transaction description',
      },
    ],
    explanation:
      'Subdomain spoofing attack. The email appears to come from chase.com but the actual domain is secure-notify.net. Banks never use such domains.',
  },
  {
    id: 'bank-3',
    category: 'banking',
    difficulty: 'hard',
    sender: 'Bank of America',
    senderEmail: 'noreply@bankofamerica.com',
    subject: 'Your monthly statement is ready',
    body: `Dear Alex Johnson,

Your monthly statement for account ending in 4821 is now available.

You can view it by signing in to your account at bankofamerica.com

If you have any questions, please call the number on the back of your card.

Bank of America Customer Service`,
    isPhishing: false,
    explanation:
      'Legitimate Bank of America notification. Correct domain, uses your name, no urgency, no links asking for credentials, and directs you to type the URL yourself.',
  },
  {
    id: 'bank-4',
    category: 'banking',
    difficulty: 'medium',
    sender: 'HDFC Bank',
    senderEmail: 'alerts@hdfcbank-kyc-update.in',
    subject: 'KYC Update Required - Account will be frozen',
    body: `Dear Customer,

As per RBI guidelines, your KYC is pending. Your account will be frozen within 48 hours if not updated.

Update KYC here: http://hdfcbank-kyc-update.in/kyc

Please provide your Aadhaar, PAN, and net banking password for verification.

HDFC Bank`,
    isPhishing: true,
    redFlags: [
      {
        text: 'hdfcbank-kyc-update.in',
        reason: 'Fake domain — real is hdfcbank.com',
      },
      { text: 'account will be frozen', reason: 'Fear tactic' },
      {
        text: 'net banking password',
        reason: 'Banks NEVER ask for your password',
      },
      {
        text: 'Aadhaar, PAN',
        reason: 'Requests sensitive personal information via email',
      },
      { text: 'within 48 hours', reason: 'Time pressure' },
    ],
    explanation:
      'KYC scam targeting Indian bank customers. Real banks never ask for passwords, Aadhaar, or PAN via email links.',
  },
  {
    id: 'bank-5',
    category: 'banking',
    difficulty: 'hard',
    sender: 'Wells Fargo',
    senderEmail: 'no-reply@wellsfargo.com',
    subject: 'A new device signed in to your account',
    body: `Hi Alex,

A new device signed in to your Wells Fargo account.

Device: iPhone 14
Location: San Francisco, CA
Time: 2:34 PM PT

If this was you, no action needed. If not, sign in to wellsfargo.com and review your recent activity.

Wells Fargo Online Security`,
    isPhishing: false,
    explanation:
      'Legitimate Wells Fargo security alert. Correct domain, personalized, no suspicious links, directs you to type the URL manually.',
  },

  // ============ SOCIAL MEDIA ============
  {
    id: 'social-1',
    category: 'social',
    difficulty: 'easy',
    sender: 'Instagram',
    senderEmail: 'security@instagram-verify.co',
    subject: 'Your account will be deleted in 24 hours',
    body: `Hi Instagram User,

Your account has been reported for violating community guidelines. Your account will be PERMANENTLY DELETED in 24 hours.

Appeal here: http://instagram-verify.co/appeal

Enter your username and password to verify ownership.

Instagram Support`,
    isPhishing: true,
    redFlags: [
      {
        text: 'instagram-verify.co',
        reason: 'Fake domain — real is instagram.com',
      },
      {
        text: 'PERMANENTLY DELETED in 24 hours',
        reason: 'Extreme urgency and threat',
      },
      {
        text: 'Enter your username and password',
        reason: 'Instagram never asks for your password',
      },
      { text: 'Hi Instagram User', reason: 'Generic greeting' },
    ],
    explanation:
      'Instagram phishing. Instagram never asks for your password or threatens immediate deletion via email.',
  },
  {
    id: 'social-2',
    category: 'social',
    difficulty: 'medium',
    sender: 'LinkedIn',
    senderEmail: 'invitations@linkedin.com',
    subject: 'You appeared in 9 searches this week',
    body: `Hi Alex,

You appeared in 9 searches this week! See who's looking for you.

View your search appearances: https://www.linkedin.com/analytics/profile-views/

The LinkedIn Team`,
    isPhishing: false,
    explanation:
      'Legitimate LinkedIn notification. Correct domain, familiar format, and links to the official LinkedIn site.',
  },
  {
    id: 'social-3',
    category: 'social',
    difficulty: 'medium',
    sender: 'Facebook Security',
    senderEmail: 'security@facebook.com',
    subject: 'Someone tried to log in to your account',
    body: `Hi Alex,

Someone recently tried to log in to your Facebook account from an unrecognized device.

Browser: Chrome
Location: Lagos, Nigeria
Time: 3:12 AM

If this was you, you can ignore this message. If not, please secure your account by visiting facebook.com/login/identify

The Facebook Team`,
    isPhishing: false,
    explanation:
      'Legitimate Facebook security alert. Correct domain, personalized, and directs you to type the URL rather than click a link.',
  },
  {
    id: 'social-4',
    category: 'social',
    difficulty: 'easy',
    sender: 'WhatsApp',
    senderEmail: 'support@whatsapp-verify.online',
    subject: 'Your WhatsApp will be deactivated',
    body: `Dear User,

Your WhatsApp account will be deactivated today because you have been reported multiple times.

To reactivate, click here: http://whatsapp-verify.online/reactivate

Enter your phone number and the 6-digit verification code you receive.

WhatsApp Support`,
    isPhishing: true,
    redFlags: [
      {
        text: 'whatsapp-verify.online',
        reason: 'Fake domain — real is whatsapp.com',
      },
      { text: 'will be deactivated today', reason: 'Urgency and fear' },
      {
        text: '6-digit verification code',
        reason: 'Never share OTP codes — this is account takeover',
      },
      { text: 'Dear User', reason: 'Generic greeting' },
    ],
    explanation:
      "OTP-stealing scam. Never share your WhatsApp verification code — that's how attackers hijack your account.",
  },
  {
    id: 'social-5',
    category: 'social',
    difficulty: 'hard',
    sender: 'Twitter / X',
    senderEmail: 'verify@x-corp.com',
    subject: 'Verify to keep your blue checkmark',
    body: `Hello,

We're updating our verification system. To keep your blue checkmark, please re-verify your account within 72 hours.

Re-verify here: https://x-corp.com/verify

You'll need to confirm your password and payment method.

X Verification Team`,
    isPhishing: true,
    redFlags: [
      {
        text: 'x-corp.com',
        reason: 'Not the official domain — real is x.com or twitter.com',
      },
      {
        text: 'confirm your password',
        reason: 'Legitimate services never ask for your password',
      },
      { text: 'within 72 hours', reason: 'Artificial deadline' },
      { text: 'payment method', reason: 'Requests financial info via email' },
    ],
    explanation:
      'Fake X/Twitter verification scam. Real X notifications come from x.com. Never re-enter passwords via email links.',
  },

  // ============ WORK / CORPORATE ============
  {
    id: 'work-1',
    category: 'work',
    difficulty: 'easy',
    sender: 'IT Support',
    senderEmail: 'it-support@company-internal.co',
    subject: 'Password Reset Required - IT Department',
    body: `Hi,

As part of our security upgrade, all employees must reset their passwords by end of day today.

Click the link below and enter your current credentials to begin:
http://company-internal.co/reset

This is mandatory for all staff.

Regards,
IT Support`,
    isPhishing: true,
    redFlags: [
      {
        text: 'enter your current credentials',
        reason: 'IT never asks for your current password',
      },
      { text: 'company-internal.co', reason: 'Suspicious domain' },
      { text: 'end of day today', reason: 'Artificial urgency' },
      { text: 'mandatory for all staff', reason: 'Authority pressure' },
    ],
    explanation:
      'Credential harvesting attack. Legitimate IT departments never ask you to enter your current password via email.',
  },
  {
    id: 'work-2',
    category: 'work',
    difficulty: 'medium',
    sender: 'CEO - Sarah Chen',
    senderEmail: 'sarah.chen.ceo@gmail.com',
    subject: 'Quick favor - are you available?',
    body: `Hi,

I'm in a meeting and can't talk right now. I need you to urgently purchase 5 Apple Gift Cards ($500 each) for a client appreciation event. Send me the codes as soon as you have them.

I'll reimburse you by end of day.

Thanks,
Sarah`,
    isPhishing: true,
    redFlags: [
      {
        text: 'sarah.chen.ceo@gmail.com',
        reason: 'CEO using a personal Gmail account',
      },
      {
        text: 'Apple Gift Cards',
        reason: 'Classic gift card scam — untraceable',
      },
      { text: 'urgently', reason: 'Creates pressure to prevent verification' },
      {
        text: "can't talk right now",
        reason: 'Isolates target from verification',
      },
    ],
    explanation:
      "Business Email Compromise (BEC) / CEO fraud. Real executives don't request gift cards over email. Always verify via a known phone number.",
  },
  {
    id: 'work-3',
    category: 'work',
    difficulty: 'medium',
    sender: 'HR Department',
    senderEmail: 'hr@company-payroll.net',
    subject: 'Salary Revision - Update Bank Details',
    body: `Dear Employee,

Due to our annual salary revision, please update your bank account details using the secure form below. This is required for the upcoming payroll cycle.

http://company-payroll.net/update-bank

Please complete before Friday.

HR Department`,
    isPhishing: true,
    redFlags: [
      { text: 'company-payroll.net', reason: 'Suspicious external domain' },
      {
        text: 'update your bank account details',
        reason: 'Never update bank info via email links',
      },
      { text: 'before Friday', reason: 'Time pressure' },
      { text: 'Dear Employee', reason: 'Generic greeting' },
    ],
    explanation:
      'Payroll diversion scam. HR departments use internal portals, not external email links, for bank detail updates.',
  },
  {
    id: 'work-4',
    category: 'work',
    difficulty: 'hard',
    sender: 'Microsoft 365',
    senderEmail: 'no-reply@microsoft.com',
    subject: 'Your password was changed successfully',
    body: `Hi Alex,

Your Microsoft account password was changed successfully on October 15, 2024.

If you made this change, no further action is needed.

If you didn't change your password, please visit account.microsoft.com to secure your account immediately.

Microsoft Account Team`,
    isPhishing: false,
    explanation:
      "Legitimate Microsoft notification. Correct domain, personalized, doesn't ask for credentials, and directs you to type the URL.",
  },
  {
    id: 'work-5',
    category: 'work',
    difficulty: 'medium',
    sender: 'Dropbox',
    senderEmail: 'no-reply@dropbox.com',
    subject: 'Invoice_2024_Final.pdf has been shared with you',
    body: `Hi Alex,

A document has been shared with you on Dropbox.

Document: Invoice_2024_Final.pdf
Shared by: accounts@vendor-partner.com

Open in Dropbox: https://www.dropbox.com/s/abc123xyz

The Dropbox Team`,
    isPhishing: false,
    explanation:
      'Legitimate Dropbox share notification. Correct domain (dropbox.com), and shared files from Dropbox are a common legitimate business workflow.',
  },

  // ============ SHOPPING ============
  {
    id: 'shop-1',
    category: 'shopping',
    difficulty: 'easy',
    sender: 'Amazon',
    senderEmail: 'orders@amazon-secure.net',
    subject: 'Your order could not be processed - Action Required',
    body: `Hello,

We were unable to process your recent order #112-4587. Your payment method was declined.

To complete your order, please update your payment information here:
https://amazon-secure.net/payment-update

If not resolved within 48 hours, your order will be cancelled and your account may be restricted.

Amazon Customer Service`,
    isPhishing: true,
    redFlags: [
      { text: 'amazon-secure.net', reason: 'Fake domain — real is amazon.com' },
      { text: 'within 48 hours', reason: 'Time pressure' },
      { text: 'account may be restricted', reason: 'Threat of consequences' },
      { text: 'Hello,', reason: 'Generic greeting' },
    ],
    explanation:
      'Amazon phishing. Real Amazon emails come from @amazon.com. Never update payment info via email links.',
  },
  {
    id: 'shop-2',
    category: 'shopping',
    difficulty: 'hard',
    sender: 'Amazon',
    senderEmail: 'shipment-tracking@amazon.com',
    subject: 'Your package has shipped',
    body: `Hi Alex,

Your order #112-4587 has shipped!

Item: Wireless Headphones
Carrier: UPS
Tracking: 1Z999AA10123456784

Track your package: https://www.amazon.com/gp/your-account/order-history

Thanks for shopping with us,
Amazon`,
    isPhishing: false,
    explanation:
      'Legitimate Amazon shipment notification. Correct domain, personalized, and links to the official order history page.',
  },
  {
    id: 'shop-3',
    category: 'shopping',
    difficulty: 'medium',
    sender: 'eBay',
    senderEmail: 'billing@ebay-billing.com',
    subject: 'Your eBay account has been limited',
    body: `Dear eBay Member,

Your account has been temporarily limited because we detected unusual activity.

To restore your account, please confirm your identity:
http://ebay-billing.com/restore

You may be asked to provide your credit card details for verification.

eBay Customer Support`,
    isPhishing: true,
    redFlags: [
      { text: 'ebay-billing.com', reason: 'Fake domain — real is ebay.com' },
      { text: 'confirm your identity', reason: 'Requests sensitive info' },
      {
        text: 'credit card details',
        reason: 'Never verify identity with credit card via email',
      },
      { text: 'Dear eBay Member', reason: 'Generic greeting' },
    ],
    explanation:
      'eBay phishing. Real eBay communication comes from @ebay.com. Never provide credit card details through email links.',
  },
  {
    id: 'shop-4',
    category: 'shopping',
    difficulty: 'medium',
    sender: 'Flipkart',
    senderEmail: 'noreply@flipkart.com',
    subject: 'Your order has been delivered',
    body: `Hi Alex,

Your order #FK-8734912 has been delivered successfully.

If you have any issues with your order, you can raise a return request within 7 days from the app.

Thanks for shopping with Flipkart!

The Flipkart Team`,
    isPhishing: false,
    explanation:
      'Legitimate Flipkart notification. Correct domain, personalized, and no suspicious action requests.',
  },

  // ============ TECH ============
  {
    id: 'tech-1',
    category: 'tech',
    difficulty: 'medium',
    sender: 'Microsoft Account Team',
    senderEmail: 'account@micros0ft-support.com',
    subject: 'Unusual sign-in activity detected',
    body: `Microsoft account

We detected something unusual about a recent sign-in to your Microsoft account.

Country/region: Russia
IP address: 185.220.101.1
Platform: Unknown

If this wasn't you, click here to secure your account immediately:
http://micros0ft-support.com/secure

Failure to verify may result in account lockout.

Microsoft Account Team`,
    isPhishing: true,
    redFlags: [
      {
        text: 'micros0ft-support.com',
        reason: 'Typosquatting — "0" instead of "o"',
      },
      { text: 'secure your account immediately', reason: 'Urgency' },
      { text: 'account lockout', reason: 'Fear-based threat' },
      {
        text: 'Microsoft account',
        reason: 'Generic greeting, missing your name',
      },
    ],
    explanation:
      'Typosquatting attack. Real Microsoft emails come from @microsoft.com or @account.microsoft.com. Look carefully at domains.',
  },
  {
    id: 'tech-2',
    category: 'tech',
    difficulty: 'hard',
    sender: 'Google',
    senderEmail: 'no-reply@accounts.google.com',
    subject: 'Security alert for your Google Account',
    body: `Hi Alex,

We noticed a new sign-in to your Google Account on a Chrome browser. If this was you, no action is needed.

Device: Windows
Location: Austin, TX
Time: October 15, 2024, 9:32 AM CDT

If this wasn't you, review the activity in your Google Account: https://myaccount.google.com/notifications

The Google Accounts Team`,
    isPhishing: false,
    explanation:
      'Legitimate Google security alert. Correct domain (accounts.google.com), personalized, and directs to the official Google account page.',
  },
  {
    id: 'tech-3',
    category: 'tech',
    difficulty: 'easy',
    sender: 'Apple Support',
    senderEmail: 'apple-id@apple-verify-icloud.com',
    subject: 'Your Apple ID has been locked',
    body: `Dear Customer,

Your Apple ID has been locked due to too many failed login attempts.

To unlock it, please verify your information:
http://apple-verify-icloud.com/unlock

Enter your Apple ID, password, and date of birth.

Apple Support`,
    isPhishing: true,
    redFlags: [
      {
        text: 'apple-verify-icloud.com',
        reason: 'Fake domain — real is apple.com',
      },
      {
        text: 'Enter your Apple ID, password',
        reason: 'Apple never asks for passwords via email',
      },
      { text: 'date of birth', reason: 'Requests personal info' },
      { text: 'Dear Customer', reason: 'Generic greeting' },
    ],
    explanation:
      'Apple ID phishing. Real Apple emails come from @apple.com. Apple never asks for your password through email.',
  },
  {
    id: 'tech-4',
    category: 'tech',
    difficulty: 'hard',
    sender: 'GitHub',
    senderEmail: 'noreply@github.com',
    subject: '[GitHub] Your pull request was merged',
    body: `Hi Alex,

Your pull request #142 "Fix login bug" has been successfully merged into the main branch.

View the changes: https://github.com/alexdev/portfolio/pull/142

Thanks for your contribution!
The GitHub Team`,
    isPhishing: false,
    explanation:
      'Legitimate GitHub notification. Correct domain, personalized, and links to the official GitHub repository.',
  },

  // ============ DELIVERY ============
  {
    id: 'delivery-1',
    category: 'delivery',
    difficulty: 'easy',
    sender: 'FedEx',
    senderEmail: 'tracking@fedex-delivery-update.com',
    subject: 'Your package is on hold - Action required',
    body: `Dear Customer,

We attempted to deliver your package today but no one was available.

To reschedule your delivery, please click here and pay the $1.99 rescheduling fee:
http://fedex-delivery-update.com/reschedule

You have 48 hours before the package is returned to sender.

FedEx Team`,
    isPhishing: true,
    redFlags: [
      {
        text: 'fedex-delivery-update.com',
        reason: 'Fake domain — real is fedex.com',
      },
      {
        text: '$1.99 rescheduling fee',
        reason: 'Small fee scam — real FedEx never charges via email',
      },
      { text: '48 hours', reason: 'Time pressure' },
      { text: 'Dear Customer', reason: 'Generic greeting' },
    ],
    explanation:
      'FedEx phishing with a small fee bait. Real delivery companies never collect payment through email links.',
  },
  {
    id: 'delivery-2',
    category: 'delivery',
    difficulty: 'medium',
    sender: 'DHL',
    senderEmail: 'noreply@dhl.com',
    subject: 'Your DHL shipment is on the way',
    body: `Hi Alex,

Your DHL Express shipment is on its way!

Tracking number: 1234567890
Estimated delivery: October 17, 2024

Track your shipment: https://www.dhl.com/track?id=1234567890

Thank you for using DHL.

DHL Express`,
    isPhishing: false,
    explanation:
      'Legitimate DHL tracking notification. Correct domain, includes real tracking number, and links to dhl.com.',
  },
  {
    id: 'delivery-3',
    category: 'delivery',
    difficulty: 'medium',
    sender: 'UPS',
    senderEmail: 'support@ups-redelivery.info',
    subject: 'Failed delivery - reschedule now',
    body: `Dear Customer,

Our driver attempted to deliver your package today but couldn't complete delivery.

Please confirm your address and pay a $3 redelivery fee here:
http://ups-redelivery.info/confirm

Without action within 24 hours your package will be returned.

UPS Customer Service`,
    isPhishing: true,
    redFlags: [
      { text: 'ups-redelivery.info', reason: 'Fake domain — real is ups.com' },
      {
        text: '$3 redelivery fee',
        reason: "Fake fee — UPS doesn't charge via email links",
      },
      { text: 'within 24 hours', reason: 'Urgency' },
      { text: 'Dear Customer', reason: 'Generic greeting' },
    ],
    explanation:
      "UPS redelivery scam. Delivery companies don't collect fees via email links. Check tracking directly on ups.com.",
  },

  // ============ GOVERNMENT ============
  {
    id: 'gov-1',
    category: 'government',
    difficulty: 'medium',
    sender: 'IRS',
    senderEmail: 'refunds@irs-gov-refund.org',
    subject: 'You are eligible for a tax refund of $1,247',
    body: `Dear Taxpayer,

Our records show you are eligible for a tax refund of $1,247.00.

To claim your refund, submit your banking information here:
http://irs-gov-refund.org/claim

You must respond within 7 days or the refund will be forfeited.

IRS Tax Refund Department`,
    isPhishing: true,
    redFlags: [
      { text: 'irs-gov-refund.org', reason: 'Fake domain — real is irs.gov' },
      {
        text: 'submit your banking information',
        reason: 'IRS never asks for bank info via email',
      },
      { text: 'within 7 days', reason: 'Time pressure' },
      { text: 'Dear Taxpayer', reason: 'Generic greeting' },
    ],
    explanation:
      'IRS refund phishing. The IRS never initiates contact via email about refunds. They only send physical letters.',
  },
  {
    id: 'gov-2',
    category: 'government',
    difficulty: 'hard',
    sender: 'Social Security Administration',
    senderEmail: 'no-reply@ssa.gov',
    subject: 'Your Social Security Statement is now available',
    body: `Hi Alex,

Your new Social Security Statement is now available online.

To view your statement, sign in to your my Social Security account at ssa.gov/myaccount

Never share your Social Security number or my Social Security credentials with anyone.

Social Security Administration`,
    isPhishing: false,
    explanation:
      'Legitimate SSA notification. Correct domain (ssa.gov — .gov domains cannot be purchased by attackers), and reminds you never to share credentials.',
  },
  // ============ CRYPTO ============
  {
    id: 'crypto-1',
    category: 'crypto',
    difficulty: 'medium',
    sender: 'Coinbase',
    senderEmail: 'security@coinbase-wallet-verify.com',
    subject: 'Your wallet needs verification',
    body: `Dear Coinbase User,

Due to new regulations, all wallets must be verified to continue trading.

Verify now with your 12-word seed phrase:
https://coinbase-wallet-verify.com/verify

Unverified wallets will be frozen in 24 hours.

Coinbase Security`,
    isPhishing: true,
    redFlags: [
      {
        text: 'coinbase-wallet-verify.com',
        reason: 'Fake domain — real is coinbase.com',
      },
      {
        text: '12-word seed phrase',
        reason: 'NEVER share your seed phrase with anyone',
      },
      { text: 'frozen in 24 hours', reason: 'Urgency and fear' },
      { text: 'Dear Coinbase User', reason: 'Generic greeting' },
    ],
    explanation:
      'Crypto seed phrase scam. No legitimate service ever asks for your seed phrase. Anyone with your seed phrase owns your wallet.',
  },
  {
    id: 'crypto-2',
    category: 'crypto',
    difficulty: 'hard',
    sender: 'Binance',
    senderEmail: 'no-reply@binance.com',
    subject: 'New device login to your Binance account',
    body: `Hi Alex,

A new login to your Binance account was detected.

IP: 203.0.113.42
Location: Singapore
Time: October 15, 2024 at 11:02 AM UTC

If this wasn't you, please reset your password immediately and enable 2FA.

Sign in at: https://www.binance.com

Binance Security Team`,
    isPhishing: false,
    explanation:
      'Legitimate Binance security alert. Correct domain, personalized, and provides security advice without asking for credentials.',
  },
  {
    id: 'crypto-3',
    category: 'crypto',
    difficulty: 'easy',
    sender: 'Elon Musk Crypto Giveaway',
    senderEmail: 'elon@tesla-giveaway.com',
    subject: '🚀 Elon Musk is giving away 5000 BTC!',
    body: `Congratulations!

Elon Musk is giving away 5000 BTC to celebrate the launch of MarsCoin!

Send 0.1-2 BTC to the address below and get 5-10 BTC back:

BTC Address: 1A2b3C4d5E6f7G8h9I0jK1l2M3n4O5p6Q7r

Only 500 winners — act fast!

Tesla Crypto Team`,
    isPhishing: true,
    redFlags: [
      {
        text: 'elon@tesla-giveaway.com',
        reason: 'Fake domain — Elon does not email giveaways',
      },
      { text: 'Send 0.1-2 BTC', reason: 'Classic advance-fee crypto scam' },
      {
        text: 'Only 500 winners — act fast',
        reason: 'Urgency and scarcity tactic',
      },
      { text: '🚀', reason: 'Excessive emojis in subject' },
    ],
    explanation:
      'Celebrity crypto giveaway scam. Nobody legitimate gives away free crypto for a "small fee." This is 100% a scam.',
  },
  {
    id: 'crypto-4',
    category: 'crypto',
    difficulty: 'hard',
    sender: 'Ledger',
    senderEmail: 'noreply@ledger.com',
    subject: 'Firmware update available for your Ledger device',
    body: `Hi Alex,

A new firmware update is available for your Ledger hardware wallet.

Version: 2.4.1
Release date: October 12, 2024

Update through Ledger Live (ledger.com/live). We will NEVER ask for your seed phrase, even during updates.

The Ledger Team`,
    isPhishing: false,
    explanation:
      'Legitimate Ledger notification. Correct domain, and explicitly reminds you that Ledger will never ask for the seed phrase.',
  },

  // ============ MORE BANKING / MIXED ============
  {
    id: 'bank-6',
    category: 'banking',
    difficulty: 'easy',
    sender: 'Citibank',
    senderEmail: 'support@citibank-secure-login.com',
    subject: 'Immediate action: Unusual account activity',
    body: `Dear Customer,

We noticed unusual activity on your Citibank account.

Log in immediately to review: https://citibank-secure-login.com

If you don't respond within 12 hours, your card will be blocked.

Citibank Fraud Team`,
    isPhishing: true,
    redFlags: [
      {
        text: 'citibank-secure-login.com',
        reason: 'Fake domain — real is citibank.com',
      },
      { text: 'within 12 hours', reason: 'Extreme urgency' },
      { text: 'your card will be blocked', reason: 'Fear tactic' },
      { text: 'Dear Customer', reason: 'Generic greeting' },
    ],
    explanation:
      'Citibank phishing. Real bank domains don\'t have hyphenated words like "secure-login" appended.',
  },
  {
    id: 'work-6',
    category: 'work',
    difficulty: 'easy',
    sender: 'Zoom',
    senderEmail: 'no-reply@zoom.us',
    subject: 'Your meeting recording is ready',
    body: `Hi Alex,

Your cloud recording of "Q4 Planning" is ready.

View Recording: https://zoom.us/rec/share/abc123

The recording will be available for 30 days.

The Zoom Team`,
    isPhishing: false,
    explanation:
      'Legitimate Zoom notification. Correct domain (zoom.us), personalized, and no action beyond viewing the recording.',
  },
  {
    id: 'shop-5',
    category: 'shopping',
    difficulty: 'medium',
    sender: 'Shopify Store',
    senderEmail: 'orders@your-store.myshopify.com',
    subject: 'Order confirmation #1001',
    body: `Hi Alex,

Thanks for your order at Your Store!

Order #1001
Total: $47.50
Estimated delivery: 3-5 business days

You can track your order at: https://your-store.myshopify.com/account

Thanks for shopping with us!`,
    isPhishing: false,
    explanation:
      'Legitimate Shopify order confirmation. Domain is a legitimate Shopify store subdomain, and it links to a real account page.',
  },
  {
    id: 'social-6',
    category: 'social',
    difficulty: 'medium',
    sender: 'Tinder',
    senderEmail: 'no-reply@tinder-secure-verify.com',
    subject: 'Your Tinder account has been flagged',
    body: `Hi there,

Your Tinder account has been flagged for suspicious activity. To keep your account, verify within 24 hours.

Verify Now: http://tinder-secure-verify.com/verify

You'll need to provide your phone number and a selfie with your ID.

Tinder Support`,
    isPhishing: true,
    redFlags: [
      {
        text: 'tinder-secure-verify.com',
        reason: 'Fake domain — real is tinder.com',
      },
      {
        text: 'selfie with your ID',
        reason: 'Requests sensitive personal data',
      },
      { text: 'within 24 hours', reason: 'Urgency' },
      { text: 'Hi there', reason: 'Generic greeting' },
    ],
    explanation:
      "Tinder phishing. Real Tinder won't ask for your ID via email or use a suspicious domain.",
  },
];

export const shuffleEmails = list => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const getEmailsByCategory = category => {
  if (category === 'all') return emails;
  return emails.filter(e => e.category === category);
};

export const getEmailsByDifficulty = difficulty => {
  if (difficulty === 'mixed') return emails;
  return emails.filter(e => e.difficulty === difficulty);
};

export const getFilteredEmails = (category = 'all', difficulty = 'mixed') => {
  return emails.filter(e => {
    const catMatch = category === 'all' || e.category === category;
    const diffMatch = difficulty === 'mixed' || e.difficulty === difficulty;
    return catMatch && diffMatch;
  });
};
