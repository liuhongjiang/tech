---
layout: post
title: "go语言学习"
date: 2013-11-25 18:28
comments: true
categories: Language
math: 
abstract: 
---

## 一点体会

下面这篇博文是在看[《go语言编程》](http://book.douban.com/subject/11577300/)书的笔记。
在看书的过程中，其实也没有对go语言进行深入的学习。仅仅是停留在对语法的简单了解。

总的来说，go语言没有它多的新东西，仅仅是将各个语言比较有特色的内容，集中到以一个语言中，而且还是基于C语言的，因为go语言的作者就是C语言的作者。哪些比较有特色的呢，例如闭包，接口，垃圾回收，还有必然语言级别支持协程。这种炒大杂烩的方式，个人感觉不可能会成功。只不过go语言已一个比较强大的干爹google，所有才多多少少掀起了几个波浪。

很有意思的一件事情是，虽然这个语言生在美国，生在google，但是目前go语言的社区最活跃的，还是我们中国的屌丝程序员。我认为这是一件极好的事情，说明了我们中国在IT方面对新事物的开明态度和勇于追逐，虽然成功可能不在go语言，但是有这种态度，终会有所作为。

## go语言简介

go语言是google推出的一个可以提高并发编程的语言，它着不同一般的背景。

* 回溯至1969 年, 肯·汤普逊（Ken Thompson）和丹尼斯·里奇（Dennis Ritchie ）在贝尔实验室的计算科学研究中心里开发出了Unix ，还因为开发Unix而衍生——C语言。
* 80年代，开始Plan 9 的操作系统研究项目，解决Unix 中的一些问题, 又演变出了Inferno 的项目分支，以及一个名为Limbo 的编程语言
* Limbo是用于开发运行在小型计算机上的分布式应用的编程语言，它支持模块化编程，编译期和运行时的强类型检查，进程内基于具有类型的通信通道，原子性垃圾收集和简单的抽象数据类型。它被设计为：即便是在没有硬件内存保护的小型设备上，也能安全运行。
* Limbo 语言被认为是Go语言的前身，不仅仅因为是同一批人设计的语言，而是Go语言确实从Limbo 语言中继承了众多优秀的特性。
* 贝尔实验室后来经历了多次的动荡，包括肯·汤普逊在内的Plan 9 项目原班人马加入了Google 。在Google ，他们创造了Go语言。
* 2007 年9月，Go语言还是这帮大牛的20% 自由时间的实验项目
* 2008 年5月，Google 发现了Go语言的巨大潜力，从而开始全力支持这个项目
* 2009年11 月，发布第一个版本在
* 2012年3月28 日，发布第一个正式版本


## go语言特性

* 自动垃圾回收 
* 更丰富的内置类型 
* 函数多返回值 
* 错误处理 
* 匿名函数和闭包 
* 类型和接口 
* 并发编程 
* 反射 
* 语言交互性 (Cgo, C语言库)

<!-- more -->

## go的工具

* 编辑器
    * 文本编辑工具gedit（Linux）/Notepad++ （Windows）/Fraise （Mac OS X）
    * 安装了GoClipse 插件的Eclipse ，集成性做得很好； 
    * Vim/Emacs，万能开发工具； 
    * LiteIDE，一款专为Go语言开发的集成开发环境。
* 工程管理
    * Go命令行工具
* 调试
    * FMT 输出日志/gdb
 
# 语言

## 变量

```
var  v1 int  
var  v2 string  
var  v3 [10] int     //  数组 
var  v4 [] int      //  数组切片 
var v5 struct { 
    f  int  
} 
var  v6 *int       //  指针 
var  v7 map [ string ] int  // map ，key 为string 类型，value 为int 类型 
var  v8 func(a  int ) int 

var v1  int  = 10
var v2 = 10  //  编译器自动推导出v2 的类型 
v3 := 10  // 编译器自动推导出v3 的类型
```
Go语言也引入了另一个C和C++ 中没有的符号（冒号和等号的组合:=），用于明确表达同时进行变量声明和初始化的工作。

go支持直接交换值

```
var  v10 int  
v10 = 123 
i, j = j, i     //交换值
```

## 常量

```
-12                 // 无类型常量
3.14159265358979323846 //  浮点类型的常量 
3.2+12i      // 复数类型的常量 
true      //  布尔类型的常量 
"foo"     //  字符串常量
```

go语言的数字类型有：
`int`、`uint`、`int32`、`int64`、`float32`、`float64`、`complex64`、`complex128`

```
const Pi float64 = 3.14159265358979323846  
const zero = 0.0             // 无类型浮点常量 
const  (  
    size int64 = 1024 
    eof = -1                //  无类型整型常量 
)  
const u, v  float32 = 0, 3    // u = 0.0, v = 3.0，常量的多重赋值 
const a, b, c = 3, 4, "foo"   // a = 3, b = 4, c = "foo",  无类型整型和字符串常量
```

## 类型

* 布尔类型：bool 

```
var v1 bool 
v1 = true
```

* 整型：int8、byte、int16 、int 、uint、uintptr等。 

go语言支持位运算

且有一个特殊类型：uintptr: 
uintptr is an integer type that is large enough to hold the bit pattern of any pointer.

* 浮点类型：float32、float64。
* 复数类型：complex64、complex128。

```
var value1 complex64       //  由2 个float32构成的复数类型 
value1 = 3.2 + 12i 
value2 := 3.2 + 12i        // value2 是complex128类型 
value3 := complex(3.2, 12)  // value3结果同 value2  
```

对于一个复数z = complex(x, y) ，就可以通过Go语言内置函数real(z)获得该复数的实部，也就是x，通过imag(z)获得该复数的虚部，也就是y

* 字符串：string。
    Go编译器支持UTF-8 的源代码文件格式
* 字符类型：rune。 
* 错误类型：error 。 

此外，Go语言也支持以下这些复合类型： 
* 指针（pointer ） 
* 数组（array） 

```
[32]byte       //  长度为32 的数组，每个元素为一个字节 
[2*N]  struct  { x, y  int32 } //  复杂类型数组 
[1000]*float64    //  指针数组 
[3][5] int      //  二维数组 
[2][2][2]float64    //  等同于[2]([2]([2]float64))
```

* 切片（slice ） `myArray[:5]`
* 字典（map） 
    
```
var  myMap map [ string ] PersonInfo
// myMap是声明的map 变量名，string是键的类型，PersonInfo则是其中所存放的值类型。
myMap =  make( map [ string ] PersonInfo)
myMap =  map [ string ] PersonInfo{ 
	"1234": PersonInfo{"1", "Jack", "Room 101,..."}, 
}
myMap["1234"] = PersonInfo{"1", "Jack", "Room 101,..."}
delete(myMap, "1234")
value, ok := myMap["1234"]  
if ok { // 找到了 
	// 处理找到的value  
}
```

* 通道（chan ） 
channel是Go语言在语言级别提供的goroutine 间的通信方式。我们可以使用channel在两个或多个goroutine 之间传递消息。channel是进程内的通信方式，因此通过channel传递对象的过程和调用函数时的参数传递行为比较一致，比如也可以传递指针等。

```
var  ch chan int
ch :=  make( chan int )
ch <- value
向channel写入数据通常会导致程序阻塞，直到有其他goroutine 从这个channel中读取数据。从channel中读取数据的语法是
value := <-ch
```

* 结构体（struct） 

```
type Rect  struct  { 
    x, y float64 
    width, height  float64 
}
```

* 接口（interface ）
* 流程控制

```
if a < 5 { 
    return 0 
} else { 
    return 1 
}

switch  i { 
    case 0: 
        fmt.Printf("0") 
    case 1: 
        fmt.Printf("1") 
    case 2: 
         fallthrough 
    case 3: 
        fmt.Printf("3") 
    case 4, 5, 6: 
        fmt.Printf("4, 5, 6") 
    default: 
        fmt.Printf("Default") 
}
```

注意上面的switch语句里面没有break语句

```
sum := 0 
for  i := 0; i < 10; i++ { 
    sum += i 
}  

a := []int {1, 2, 3, 4, 5, 6} 
for  i, j := 0, len(a) – 1; i < j; i, j = i + 1, j – 1 { 
    a[i], a[j] = a[j], a[i] 
}
```

且go语言包含goto语句

* 函数

```
package mymath 
import "errors" 
 
func Add(a int , b int ) (ret int , err error) { 
    if a < 0 || b < 0 { //  假设这个函数只支持两个非负数字的加法 
        err= errors.New("Should be non-negative numbers!") 
        return 
    } 
 
    return  a + b,  nil  //  支持多重返回值 
}
```

* 不定参数类型

```
func myfunc(args ... int ) { 
    for  _, arg :=  range args { 
		fmt.Println(arg) 
    }  
}

n, _ := f.Read(buf)
```

* 闭包

```
package main   
 
import  ( 
	"fmt" 
)   
 
func main() { 
    var  j  int  = 5 
 
    a := func()( func()) { 
         var  i  int  = 10 
         return func () { 
            fmt.Printf("i, j: %d, %d\n", i, j) 
        } 
    }() 
 
    a() 
 
    j *= 2 
 
    a() 
}
```

* defer
    解决释放资源的问题, 可以通过defer字段实现资源的自动释放 

```
func CopyFile(dst, src string ) (w int64, err error) { 
    srcFile, err := os.Open(src) 
    if err !=  nil  { 
         return 
    } 
 
    defer srcFile.Close() 
 
    dstFile, err := os.Create(dstName) 
    if err !=  nil  { 
         return 
    } 
 
    defer dstFile.Close() 
 
    return  io.Copy(dstFile, srcFile)  
}
```

* panic()和recover()

panic()函数时，正常的函数执行流程将立即终止，但函数中之前使用defer 关键字延迟执行的语句将正常展开执行，之后该函数将返回到调用函数，并导致逐层向上执行panic流程，直至所属的goroutine 中所有正在执行的函数被终止。

recover()函数用于终止错误处理流程。

## 面向对象

对于面向对象编程的支持Go 语言设计得非常简洁而优雅。简洁之处在于，Go语言并没有沿袭传统面向对象编程中的诸多概念，比如继承、虚函数、构造函数和析构函数、隐藏的this指针等。优雅之处在于，Go语言对面向对象编程的支持是语言类型系统中的天然组成部分。整个类型系统通过接口串联，浑然一体。我们在本章中将一一解释这些特性。
类型
在Go语言中，你可以给任意类型（包括内置类型，但不包括指针类型）添加相应的方法，例如： 

```
type Integer int  
 
func (a Integer) Less(b Integer) bool { 
	return  a < b 
}

var  a Integer = 1 
if a.Less(2) { 
	fmt.Println(a, "Less 2") 
}
```

在你需要修改对象的时候，才必须用指针。它不是Go语言的约束，而是一种自然约束。
举个例子： 

```
func (a *Integer) Add(b Integer) { 
    *a += b 
}
a.Add(2)
```

* 值语义和引用语义

```
var  a = [3] int {1, 2, 3} 
var  b = a 
b[1]++ 
fmt.Println(a, b)
```

Go语言中的大多数类型都基于值语义

`基本类型`：如byte、int 、bool、float32、float64和string等；  

`复合类型`：如数组（array）、结构体（struct）和指针（pointer ）等。

Go语言中有4个类型比较特别，看起来像引用类型

`数组切片`：指向数组（array）的一个区间。 

`map`：极其常见的数据结构，提供键值查询能力。 

`channel`：执行体（goroutine ）间的通信设施。 

`接口（interface ）`：对一组满足某个契约的类型的抽象。

* 结构体 

```
type Rect  struct  { 
    x, y float64 
    width, height  float64 
}
// 初始化
rect1 := new (Rect) 
rect2 := &Rect{} 
rect3 := &Rect{0, 0, 100, 200} 
rect4 := &Rect{width: 100, height: 200}
```

* 匿名组合：

```
type Base  struct  { 
    Name string 
} 
 
func (base *Base) baseFoo() { ... } 
func (base *Base) baseBar() { ... }

type Foo struct  { 
    Base 
    ... 
}

func (foo *Foo) Bar() { 
    foo.Base.baseBar() 
    ... 
}
```

要使某个符号对其他包（package）可见（即可以访问），需要将该符号定义为以大写字母开头

* 接口

非侵入式接口:
将对象实例赋值给接口；将一个接口赋值给另一个接口。

我们定义一个Integer类型的对象实例，怎么将其赋值给LessAdder

```
type Integer int  
 
func (a Integer) Less(b Integer) bool { 
    return  a < b 
} 
 
func (a *Integer) Add(b Integer) { 
    *a += b 
}

type LessAdder  interface { 
    Less(b Integer) bool 
    Add(b Integer) 
}
var  a Integer = 1 
var  b LessAdder = &a
```

下面的例子，定义了两个不同的包：

```
package one 
 
type ReadWriter interface { 
    Read(buf []byte) (n int , err error) 
    Write(buf [] byte) (n int , err error) 
}

package two 
 
type IStream interface { 
    Write(buf [] byte) (n int , err error) 
    Read(buf []byte) (n int , err error) 
}
```

任何实现了one.ReadWriter接口的类，均实现了two.IStream ； 

1. 任何one.ReadWriter接口对象可赋值给two.IStream ，反之亦然； 
2. 在任何地方使用one.ReadWriter接口与使用two.IStream 并无差异。 

以下这些代码可编译通过： 

```
var  file1 two.IStream =  new (File) 
var  file2 one.ReadWriter = file1 
var  file3 two.IStream = file2
```

接口查询：

```
if file5, ok := file1.(two.IStream); ok { 
    ... 
}
```

* Any 类型

由于Go语言中任何对象实例都满足空接口interface{}，所以 interface{} 看起来像是可
以指向任何对象的Any 类型，如下： 

```
var  v1 interface{} = 1       //  将int 类型赋值给interface{} 
var  v2 interface{} = "abc"   //  将string类型赋值给interface{} 
var  v3 interface{} = &v2     //  将*interface{}类型赋值给interface{} 
var  v4 interface{} = struct { X int  }{1} 
var  v5 interface{} = & struct { X int  }{1}
```

fmt包中的Print定义，可以看出any类型的优势。

```
func Print(a ...interface{}) (n int, err error)
func Printf(fmt string , args ...interface{}) 
func Println(args ...interface{})
```

## 并发编程

并发编程的模型一般有：

* 多进程
* 多线程
* 基于回调的非阻塞/ 异步IO
* 协程

[协程](http://zh.wikipedia.org/wiki/%E5%8D%8F%E7%A8%8B)[(coroutine)](http://en.wikipedia.org/wiki/Coroutine)本质上是一种用户态线程，不需要操作系统来进行抢占式调度，且在真正的实现中寄存于线程中，因此，系统开销极小，可以有效提高线程的任务并发性，而避免多线程的缺点。使用协程的优点是编程简单，结构清晰；缺点是需要语言的支持，如果不支持，则需要用户在程序中自行实现调度器。目前，原生支持协程的语言还很少。

子例程(线程)的起始处是惟一的入口点，一旦退出即完成了子程序的执行，子程序的一个实例只会返回一次。
协程可以通过yield来调用其它协程。通过yield方式转移执行权的协程之间不是调用者与被调用者的关系，而是彼此对称、平等的。
协程的起始处是第一个入口点，在协程里，返回点之后是接下来的入口点。

以下是协程的一段伪代码

```
生产者协程
   loop
       while q is not full
           create some new items
           add the items to q
       yield to consume
消费者协程
   loop
       while q is not empty
           remove some items from q
           use the items
       yield to produce
```

一个python的例子：

```python
def h():
    print 'Wen Chuan',
    m = yield 5  # Fighting!
    print m
    d = yield 12
    print 'We are together!'

c = h()
m = c.next()  #m 获取了yield 5 的参数值 5
d = c.send('Fighting!')  #d 获取了yield 12 的参数值12
print 'We will never forget the date', m, '.', d
```

输出结果：

```
Wen Chuan Fighting!
We will never forget the date 5 . 12
```

Go 语言在语言级别支持轻量级线程，叫goroutine 。
一个函数调用前加上go关键字，这次调用就会在一个新的goroutine 中并发执行。当被调用的函数返回时，这个goroutine 也自动结束了。需要注意的是，如果这个函数有返回值，那么这个返回值会被丢弃。

```
package main 
 
import  "fmt" 
 
func Add(x, y int ) { 
    z := x + y 
    fmt.Println(z)  
}   
 
func main() { 
	for i := 0; i < 10; i++ { 
 		go Add(i, i) 
    }  
}
```

代码源文件

{% include_code 协程示例1 2013/go/goroutine1.go %}

{% include_code 协程示例2 2013/go/goroutine1.go %}


* channel

channel是Go语言在语言级别提供的goroutine 间的通信方式。我们可以使用channel在两个或多个goroutine 之间传递消息。channel是进程内的通信方式，因此通过channel传递对象的过程和调用函数时的参数传递行为比较一致，比如也可以传递指针等。

channel是类型相关的。也就是说，一个channel只能传递一种类型的值，这个类型需要在声明channel时指定。如果对Unix 管道有所了解的话，就不难理解channel，可以将其认为是一种类型安全的管道。

语法：

```
var  chanName chan ElementType
var  ch chan int
var  m  map [ string ] chan bool
ch :=  make( chan int )
```

在channel的用法中，最常见的包括写入和读出。将一个数据写入（发送）至channel的语法很直观，如下：

	ch <- value 

向channel写入数据通常会导致程序阻塞，直到有其他goroutine 从这个channel中读取数据。从channel中读取数据的语法是 

	value := <-ch  

如果channel之前没有写入数据，那么从channel中读取数据也会导致程序阻塞，直到channel中被写入数据为止。

```
Select
select  { 
	case <-chan1: 
	// 如果chan1成功读到数据，则进行该case处理语句 
 	case chan2 <- 1: 
	// 如果成功向chan2 写入数据，则进行该case处理语句 
 	default: 
	// 如果上面都没有成功，则进入default处理流程 
}
```

* 缓冲机制

给channel带上缓冲，从而达到消息队列的效果。 要创建一个带缓冲的channel，其实也非常容易： 

	c := make( chan int , 1024)

从带缓冲的channel中读取数据可以使用与常规非缓冲channel完全一致的方法，但我们也可以使用range关键来实现更为简便的循环读取：

``` 
for  i :=  range c { 
    fmt.Println("Received:", i) 
}
```

需要注意的是，在Go语言中channel本身也是一个原生类型，与map之类的类型地位一样，因此channel本身在定义后也可以通过channel来传递。

* 超时机制

Go语言没有提供直接的超时处理机制，但我们可以利用select机制。

```
//  首先，我们实现并执行一个匿名的超时等待函数 
timeout :=  make( chan bool, 1) 
go func() { 
    time.Sleep(1e9) //  等待1秒钟 
    timeout <- true 
}() 
 
//  然后我们把timeout这个channel利用起来 
select  { 
	case <-ch: 
	// 从ch中读取到数据 
	case <-timeout: 
	// 一直没有从ch中读取到数据，但从timeout中读取到了数据 
}
```

* 单向channel

```
var  ch1 chan int  // ch1 是一个正常的channel，不是单向的 
var  ch2 chan<-  float64// ch2 是单向channel，只用于写float64数据 
var  ch3 <-chan int  // ch3 是单向channel，只用于读取int 数据
```

只有在介绍了单向channel的概念后，读者才会明白类型转换对于channel的意义：就是在单向channel和双向channel之间进行转换。示例如下： 

```
ch4 := make( chan int ) 
ch5 := <-chan int (ch4) // ch5就是一个单向的读取channel 
ch6 := chan<-  int (ch4) // ch6  是一个单向的写入channel
```

关闭channel

	close(ch)

关闭后：

	x, ok := <-ch 

这个用法与map 中的按键获取value的过程比较类似，只需要看第二个bool返回值即可，如果返回值是false 则表示ch已经被关闭。

多核并行化，让出时间片


{% include_code 多核并行示例  2013/go/parallel.go %}

* 同步

Go语言包中的sync包提供了两种锁类型：sync.Mutex和sync.RWMutex。
RWMutex相对友好些，是经典的单写多读模型

Go语言提供了一个Once类型来保证全局的唯一性操作，

```
var a string  
var once sync.Once   
 
func setup() { 
 	a = "hello, world" 
}   
 
func doprint() { 
	once.Do(setup) 
	print(a)  
}   
 
func twoprint() { 
	go doprint() 
	go doprint()
}

```

goroutine 和channel 是支撑起Go语言的并发模型的基石，让Go语言在如今集群化与多核化的时代成为一道极为亮丽的风景

最后，看书的过程中，写的关于一些简单的go语言的例子，在[这里](https://github.com/liuhongjiang/tech/tree/source/source/code/2013/go).
