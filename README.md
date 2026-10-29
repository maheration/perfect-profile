# Perfect Profile

**A physician-developed clinical communication application for a glomerulonephritis clinic.**

Node.js · Express · MongoDB · Mongoose · Passport · JWT · Apple Push Notification service

[iOS application and interface source](https://github.com/maheration/profile-ios)

## The clinical problem

Patients receiving ongoing care need a clear way to access their treatment plan, medication information and laboratory-monitoring instructions between appointments. Perfect Profile was designed for a glomerulonephritis (GN) clinic to make clinician-entered care information available through a patient-facing mobile application.

## My contribution

I designed and developed both the native Swift iOS application and the Node.js/Express backend with MongoDB, including patient and clinician interfaces and Apple push-notification integration.

## How it works

1. A clinician selects a patient and creates or updates their treatment plan or medication information in the iOS application.
2. The backend stores the information in MongoDB and exposes it through an API.
3. The patient can view their care information in the patient interface.
4. Following changes, the iOS client makes a separate request to the backend to send an Apple push notification.

This sequence describes the implemented design. Saving an update and sending its notification are separate operations; a successful API response from the notification endpoint does not prove delivery.

## Features implemented in the source

| Capability | Implementation |
| --- | --- |
| Accounts | Registration, password authentication and JWT issuance |
| Treatment plans | Create, retrieve and update diagnosis, treatment-plan text and lab-monitoring instructions |
| Medication information | Create, retrieve, update and delete patient-linked medication entries |
| Clinician workflows | Patient listing and admin middleware on plan/medication write routes |
| Notifications | APNs provider integration, device-token updates and badge counters |
| Data persistence | Mongoose models linking clinical entries to patients and authors |

The application addresses access to care information. Two-way messaging, EHR integration, laboratory-results feeds and adherence tracking are not established by this source.

## Architecture and code guide

The companion Swift app sends JSON requests to an Express API. Route handlers use Mongoose models to store and retrieve data in MongoDB. A separate account route integrates with APNs.

| Location | Purpose |
| --- | --- |
| `app.js` | Application setup, database connection and route mounting |
| `src/routes/account.js` | Accounts, patient listing, device tokens and notifications |
| `src/routes/plan.js` | Treatment-plan operations |
| `src/routes/medication.js` | Medication operations |
| `src/routes/codes.js` | Invitation-code operations |
| `src/models/` | User, plan, medication and code schemas |
| `src/middleware/authmiddleware.js` | JWT authentication and admin middleware |

## Project history

Developed in **2017–2018**. This repository preserves the original work as a historical portfolio project; it is not actively maintained. The source demonstrates the features described above, but current build compatibility and notification delivery have not been revalidated.

I provided the code to the University of Alberta for possible implementation. I cannot confirm subsequent implementation or adoption, and no measured clinical or operational outcomes are claimed.

## Technical context

This repository preserves an early Node.js/Mongoose implementation. The original configuration uses a local MongoDB database and port 3000. It has known authorization and security limitations, and is not intended for clinical deployment or use with real patient data. Historical credentials must not be reused. A current runnable installation and end-to-end test have not been verified.
