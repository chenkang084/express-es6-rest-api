/**
 * Created by chenkang1 on 2017/7/18.
 */


 console.log(111)

 process.nextTick(()=>{
     console.log('next tick')
 })

 console.log(222)