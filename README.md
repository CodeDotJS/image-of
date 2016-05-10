<h1 align="center">
<img width="330" height="165" src="http://rishigiri.com/github/fbimg.png"></img>
<br>
</h1>

> Download profile picture of any facebook user.

## Install

```
$ npm install --global facebook-id-of

$ npm install --global image-of
```

## Structure

```
	$ image-of

		Usage : image-of -u <command> [info] <command> [file]

Commands:
  u  ❱ facebook user's user-id
  i  ❱ facebook user's username

Options:
  -n  ❱ save image as                              [required]
```

## Start

> If you don't know user id of a facebook user 

```
$ facebook-id-of -u [user.name]
	
	Usage 
		$ facebook-id-of -u zuck

			ZUCK's Facebook ID is 4

```

## Usage 

__CASE : 1__ : Download profile picture of a facebook user using their username.

```
$ image-of -i RishiDotJS -n rishi

	❱ Directory Created   :   ✔

	❱ Facebook user       :   ✔

	❱ Image saved in      :   Images ❱ rishi.jpg 

```

__CASE : 2__ : Download profile picture of a facebook user using their userid.

```
$ image-of -u 4 -n zuck
	
	❱ Directory Created   :   ✔

	❱ Image Saved In      :   Images ❱ zuck.jpg 
```

## Note 

> Don't give any extenion to the filename while downloading image. For example :

```
	$ image-of -u 4 -n zuck.jpg [ wrong ]

	$ image-of -u 4 -n zuck [ right ]
```

## Screenshot

<img src="https://raw.githubusercontent.com/rishigiridotcom/rishigiri.com/17afbe956c70ad6fbb668b14acd371fc3251529e/github/image-of.png" alt="">

## Related

[Facebook-Id](https://github.com/CodeDotJS/facebook-id-of)


## License

MIT © [Rishi Giri](http://rishigiri.com)
