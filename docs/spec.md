## Problem
- we have a dropbox directory of images
- each image is a photo of a number of fabric colours/patterns
- each image contains an identifier-code (in a white box), and each fabric in the image is numbered
  - we do not need to be able to add new images, or edit existing images
- we want to be able to view the images, and assign notes/ratings to each fabric
  - fabrics can be rejected, or assigned a rating
  - notes can be added to each fabric

- we want a simple website to view the images, and add notes/ratings

## Requirements
- there is no need for authentication, although a simple user selector when first loading the page is needed to identify the user for attributing notes/ratings
- there will just be two users: andre and aly
- each user can set their own notes/ratings, but can see the other user's notes/ratings
- there is no need for a database
- ratings are just: none, no, maybe, yes
- data should be stored in a file in the data directory so it can be committed to git
- we should just link to the image files in the dropbox directory, rather than copy them
  - we need a mapping file to map the identifier-code to the image file name
  - users should never see the file name, just the identifier-code

- each image has multiple fabrics (mostly numbered 1-6, but not always)
- each fabric can have a type - default to unknown, but can also be suit or shirt
  - it should be sufficient to assign type to each image as all fabrics in one image should be the same type

- a simple react app, running at :3500 is sufficient (unless you think otherwise)
- the view should allow a filter by ratings
  - inclusions would be OR across users
  - exclusions would be AND across users
  - an advanced filter would allow per user rating selections (user/rating matrix and checkboxes for each)


## Notes
- photos are in dropbox here:
  https://www.dropbox.com/scl/fo/oh849kgbfh32dttgeh22s/AH5ycOtVaP-O9to6M7tq58Y?rlkey=7w5oet0ra5i2vfnlpup0uh2ps&st=1vfu3s7a&dl=0
