<h1 align="center">
  <a href="https://github.com/binkhq/aperture">
    <!-- Please provide path to your logo here -->
    <img src='./docs/aperture-splash.png' alt="Logo" width="400" height="400">
  </a>
</h1>



# About

- This is a guide, we don't need to always following the advice of this document but we ought to have a good reason to make exceptions. Being consistent is king but at the same time of this is set in stone, if we feel another approach is better, let's change it.

- I am not going to spell everything out, but to introduce the codebase and flag anything that might trip you up which getting to grips with it.


# The very basics

## File structure

So you have cloned the app and you are wondering how the folder structure is the way it is.... let me take you for a quick tour. Before you panic, we will get into more detail on the concepts referenced later in this doc.

### Root

The core of the app is in Src, so the root is home to config files for our various libraries (which ill get to later), CI and env files

The env files are used to hold values used by Sentry, Auth0 and Next across the following environments:

- Local
- Dev
- staging
- Prod

If you do not have a local env file, then thats because it isn't included in our version control. Speak to another Dev or product owner for a copy.


### Src

Lets lets go in aplhabetical order here:

- __tests__ - These are unit tests for **pages** only, other unit tests live with thier components.
- app - Config for our redux store, mostly reducers.
- components - Shockingly this is where our components live. We use an index model to make referencing components somewhat easier. This means every component has its own folder with an index.ts file to refer to the component tsx file. Top level components also are added to the components/index.ts file. Modal components live in the Modals folder and rely on the ModalFactory to render based on what modal is requested via Redux.
- features - In Redux toolkit, this is where we keep our redux slices
- hooks - Where we store our custom hooks if they have scope beyond a singular component. Mostly this contains files that help with with making api calls.
-  icons - Where we keep small icon files (typically in the svg folder). Sometimes public is used in the root folder
- lib - Contains auth0 config.
- pages - contains our NextJS pages and is used for routing. Also the api folder is used for auth0 config.
- services - Our api calls to the backend grouped by area of concern using RTK Query
- styles - This contains a few global CSS settings, including some Tailwind custom classes for classes we use everywhere such as Typography
- types - contains a file containing our global Type definitions in typescript. If a type exists in more than one component, it is defined and referenced from here.
- utils - Handy little functions that can be used across multiple components live here to be referenced accordingly.



# Our Frameworks

High-level things to know about our use of various frameworks to point you in the right direction. This is the part of this guide that is most likely to go stale so lets do our best ot keep it update weh nwe change things.

## NextJs

- We are currently on Next 12.

- We deploy a [static HTML export](https://nextjs.org/docs/advanced-features/static-html-export) which limits the features we can use. This was a decision made to make DevOps' life easier and at the time we did not know how we were going to use NextJS features that this prevents. 

In the long term, it is a goal to utilise more of Next's features. In particular, seeing how static, server-side and client-side rendering choices can improve performance.


## Redux Toolkit with RTK Query

## Unit Testing with RTL/Jest

## TailwindCSS

## Auth0

## Sentry

## Husky

## ESLint

## SVGr

## Headless UI

## Just ...


# Our Code Standards

Ok, so we haven't talked about the code itself the style we use. Life is too short for me to go through every typescript and react pattern we use, ESlint can help with much of that and hopefully the rest of it can be deduced from existing components. So again here I just want to highlight any weirdness and high-level things that matter when writing code for Aperture.


## Accessibility

## Responsiveness

## Security

Installing new package....

## Dark Mode


## Images



## React

## Typescript


## Modals

## When to componentise

## Vulnerability Management

What do we do about it?




# Development Pipeline

Phew, nearly there. Now you are ready to *Get Things Done* but need to know how we typically get from a Jira ticket, to the code being deployed on production. Lets go through that process to show the conventions we use.

## Git strategy

We use Gitlab Flow as our branching strategy which looks like this:

 <img src='./gitlab-flow.jpeg' alt="gitlab flow" width="800" height="400">

 QA uses the staging branch to do their thing so we normally update staging each time we update develop.

So my typical workflow to add a feature goes like this:

1. Create a new local feature branch from Develop (making sure its the latest version from Github), I will typically call this '*ticket reference* - *short description*'  So a Jira ticket that is 'MER-2013' should have a feature branch that starts with 'MER-2013 -'

2. Commit early, commit often is good advice. We use [Conventional Comments](https://www.conventionalcommits.org/en/v1.0.0/#summary) as a guide for good commit messages, small commits rarely need more than a sentence to explain. We don't normally have a reason to squash them so you don't have to.

3. Push the local branch to the remote and create the PR. With Jira being the source of information, we don't need to explain what the feature does but any interesting/tricky code-related things could be added to the description.

4. Request a code review, its worth pinging the other Dev(s) on Team to let them know. If its urgent or a tiny change, its good to point that out. More on code reviews later...

5. If review is good, merge the PR into Develop. 

6. ** Important ** - We use the GitHub release tags to trigger a deployment to staging. This involves creating a new release tag (https://github.com/binkhq/aperture/releases/new) which is in the format of '1.<sprint increment>.<increment>'  ... that will make more sense when you see it. We just generate the release notes using hte handy button on that page.

7. Publishing the new release will trigger a GitHub action to deploy to staging, this typically takes 15 mins or so. Let QA know you have done this, move the ticket to 'QA in progress' and pat yourself on the back,well done!

8. .... Wait, no, QA have found a defect you need to fix! If the defect is not better raised as a bug you need a hotfix... in which case that new feature branch is prefixed with 'hotfix-1-MER-XXX'




## Code Reviews



https://monzo.com/blog/2021/09/30/documenting-pull-requests-is-as-important-as-writing-good-code


ESLint Rules


https://airbnb.io/javascript/react/#basic-rules

https://google.github.io/styleguide/tsguide.html#using-the-spread-operator


https://levelup.gitconnected.com/react-code-conventions-and-best-practices-433e23ed69aa


# Culture stuff

One last thing, I promise. We are a small team but we have standards in how we work as a team to make it a nice place to be and a nice codebase to code for. Some of these points probably conflict with each other, you are smart enough to work out a middle ground...

- Take your time - Explore different approaches, play around with the related code and consider all angles. Give yourself the time it needs, it will make for better code in the long run when you choose how long to spend on it.

- Just ship it - You took your time but .... you are still not happy with how you have coded a feature? Or just can't figure it out at all? You could spend days banging your head against it or you can just submit the draft PR explaining what you are not happy with and we can figure it out together. Do that, saves a whole heap of time and angst. Lean on the review process and QA, they are good at what they do. 

- Make changes small, make them often. In our refinement sessions, try and find ways to make the feature requests small and manageable (one common trick is splitting out visuals and functionality into their own tickets). Small tickets are easier to review and QA as well as reducing chances of merge conflicts.

- Technical debt is a useful tool to keep focus on the feature itself, we make time each sprint to tackle tech debt so we use it often, just responsibly.

- Solve problems at the root. Let's try and address the cause and not the symptom. If a feature requires workarounds and hacks, lets try and address the root cause of why that is. (tech debt is our friend)

- Do not accept deviant system behaviour. When a system repeatedly exhibits behaviour that we can’t explain, it’s easy to become collectively accustomed to it and treat it as “normal.” A good example of this is console warnings in the browser. We make sure our new code does not create more errors and warnings. If its beyond the scope of the feature itself we make sure it is in the tech debt pile. 

- Write code to be read by humans. If code is hard to understand, its hard to spot bugs. Prefer long descriptive names, prefer multiple simple functions and components rather than one that does it all and prefer to use more lines of code to make the code clearer. Feel free to comment anything that is unavoidably unintuitive, or cannot be summarised via its name (useEffect hooks for example)

- If you can’t show it’s a bottleneck, don’t optimise it. Correctness is nearly always more important than performance. Because optimisation generally increases code complexity, only go after performance when you are sure its running at a sufficiently large scale that the gains will be significant. Again, using tech debt for such things is your friend.

- Unblock others whenever you can.  If someone is waiting on you for a code review, prioritise it ahead of writing new code yourself.

- Leave the codebase better than you found it. You’re are never stepping on anyone’s toes by trying to make things better. This is doubly so for this document you are reading now.

All done, now lets make some cool things!