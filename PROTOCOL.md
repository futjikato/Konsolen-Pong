# Protocol for Konsolen-Pong

via TCP<br>
Default port is 5993<br>
Host = Server<br>
Other player = Client<br>

## Handshake like stuff

```
S: OK | S: ER				- OK if server accepts new players 
							- ER if game is running or server cannot accept more players

C: ME <name>				- Client informs server about wanted player name

S: OK | S: ER				- OK if name is accepted
							- ER if name is invalid
```

## Chat communications ( Not implemented yet )

```
S: CH <user>				- Server sends chat message. In the first row the server says only the name.
<message>					- The next row(s) are filled with the message
.							- End of chat message is defined with a single dot ( POP3-Style )

C: CH <user>				- Client send chat messages just as the server sends them.
<message>
.
```

## Game turn communications
The integer is the absolute position of the racket.<br>
The client always sends right after server.<br>
<br>
Server sends current position every 100 ms.<br>
Client can answer ones per server message.<br>

```
These messages always follow up. First RA then BA.

S: RA <int>					- Racket position of the opponent

S: BA <x>					- BA border. ball position follows first param is x-axis
<y>							- second param is y-axis

------

C: RA <int>					- Client can send own racket position at any time

------

S: SC <user>				- Instead of RA the server can send an SC at any time. Informs about a score for the given player.
```