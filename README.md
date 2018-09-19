[![Build Status](https://travis-ci.org/ohtuprojekti-ilmo/ohtuilmo-frontend.svg?branch=master)](https://travis-ci.org/ohtuprojekti-ilmo/ohtuilmo-frontend)

Ohjelmistotuotantoprojektien ilmoittautumissovellus

- [Backlog](https://trello.com/b/Wv50WMSA/backlog)
- [Backend](https://github.com/ohtuprojekti-ilmo/ohtuilmo-backend)

**Docker-imagen mounttaaminen:**  
projektin juuressa:
- `sudo docker build -t ohtuprojektiilmo/ohtufront .`  
- `sudo docker run --rm -p x:3000 ohtuprojektiilmo/ohtufront`  
- missä "x" on haluamasi portti
