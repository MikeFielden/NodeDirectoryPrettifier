# Idea
The idea here is to take a folder structure from say a torrent download and scrub out all the crap

> Example: `UFC.189.Early.Prelims.720p.WEB-DL.x264`

> Output: 
* Replace `.` with space
* Remove all crap that isnt the name
    * Idea: Perhaps build up a list of common crap to remove
        * In this case maybe 
            `['720p', 'WEB-DL', 'x264']`

