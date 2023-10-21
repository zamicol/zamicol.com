
RFC 8785 Is Bad  

# JSON 8259 Vs. JCS 8785 

It is remarkable that JSON rejects UTF-16 and mandates UTF-8 despite its JavaScript heritage, and for good reason.  [JSON RFC 8259 chose UTF-8](https://www.rfc-editor.org/rfc/rfc8259#section-8.1) for JSON after extensive discussions with bright minds writing diverse software across the industry over many years. 

UTF-8 is just better, so JSON codified it.  

# UTF-8 Is King
Why is UTF-8 better?  [The Wikipedia page](https://en.wikipedia.org/wiki/UTF-8) is full of reasons, but significantly for this post, Unicode, UTF-8, and UTF-32 all share a common sorting order, while UTF-16 does not. UTF-16 misordering was an oversight corrected by UTF-8.  Put simply, UTF-16 flunked the simple task of saying the alphabet in order, even though it was given a cheat sheet, Unicode.  It's a bad oversight, one of those mistakes that make the smartest of experts look like they have no clue what they're doing.  

What does UTF-8's dominance look like?
- From 0% adoption in 2002, UTF-8 is now used by 98.0% of the web.  UTF-16 doesn't appear in the top 6 encodings and has under 0.002% of web pages.  

![](https://upload.wikimedia.org/wikipedia/commons/f/fd/UTF-8_takes_over.png)

- The last UTF-16 utilizing organization, Microsoft, advised UTF-16 for it's own software since the 90's, but in May 2019 they reversed their position now recommend UTF-8.  
- UTF-8 is the default string primitive in Go, JSON, Julia, Rust, Swift 5, and PyPy, future Python, Visual Studio, and on. 

# 8785 and UTF-16
There's a small new comer resurrecting the zombie UTF-16, [RFC 8785](https://www.rfc-editor.org/rfc/rfc8785), published in 2020.

8785 was created by a small group with limited input over a short time and was narrowly focused on their own tech stack (Java and .Net).  They choose UTF-16.  

This was incorrect for many reasons, but overwhelmingly, it goes against JSON.  JSON is UTF-8.  That's more than enough reason to scrap all of 8785, and not another word needed to be said. 

But, why did they make this bad decision?  The psyche always informs.  Well, the RFC's rational is right there, the answer is "Java and .Net".  

That's a funny reason, because of uncountable languages, only three, Java, .NET, and JavaScript, use UTF-16.  Everyone else, JSON itself, Go, Julia, Rust, Swift 5, and PyPy, future Python, Visual Studio, and on ad nauseam, uses UTF-8 because it's not-even-close superior.  And it's not like technologies that don't use UTF-8 use UTF-16, they don't.  Instead they may use the simple ASCII or UTF-8 optionally.  Only those three languages use UTF-16, no one else does.  And they don't use UTF-16 because it's a good idea, they use it for legacy technical debt reasons and not technical merit.

Purely in the context of JSON, 8785 made a bad call and UTF-16 is incorrect.  

Now, don't let the fact that 8785 is an RFC worry you.  Just because something is an RFC doesn't guarantee that it's a well-crafted specification or authoritative.  Many RFCs are rejected, ignored, abandoned, or never adopted.  Thankfully, 8785 hasn't gained industry adoption, and this post is an attempt to try to keep it that way.  

Another problem is that 8785 burdens implementers with both UTF-8 and UTF-16.  A single UTF-8 dependency is better and already required by JSON.  Every engineer knows, one specification is much better than two.  

# Go proposal
There was a [Go proposal](https://github.com/golang/go/discussions/63397) was thinking about 8785.  I couldn't help but see irony:

Two Go authors, Ken Thompson and Rob Pike, created UTF-8.  After UTF-8's creation, it quickly dominated the whole of the industry.  

Both Go and JSON are UTF-8.  Not only that, the Go authors made UTF-8 because of the deficiencies of UTF-16.  

Go should not promote the expansion of the outdated UTF-16.  Go implementing 8785 would result in the expansion of UTF-16.  The newer and better-designed UTF-8 should supersede the older and problematic UTF-16, not the other way around. 

# Where to go from here?

I'm toying with the idea of submitting a new RFC to either supplement, replace, or be an alternative to 8785, and I'd welcome other engineers to join.  There are other 8785 inaccuracies and instead of submitting errata, perhaps a revision or replacement is warranted.  

If you need JSON canonicalization, follow the rest of 8785 but use UTF-8 ordering and not UTF-16.  






Imagine that if you lived in Kansas, and starting in July 1996 you had to flip the order of `lmnop` with `uvxyz`. 

Unlike everyone else in the world, your alphabet is now `abcdefghijkuvwxyzpqrstlmno`.

Did the alphabet everyone else uses exist before you made your own?  Yes, of course.  
Why did Kansas flip some letters?  No one knows.  
Is there a good reason to flip the letters?  No.  

**That's UTF-16. **

UTF-16, unlike UTF-8, UTF-32, or Unicode, has some "letters" out of order.  

UTF-8 has all it's letters in order.  That's just one reason why UTF-8 is superior.  



So again, why UTF-16 is like this?  No one knows.  