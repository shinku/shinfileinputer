export enum OUTOUTTYPE {
    BASE64="base64",
    TEXT="text",
    BUFFRR="arraybuffer"
}
export  default class shinfileinput {
    private input:HTMLInputElement;
    private file:FileReader;
    public data:any;
    //public chacheFile:any;
    private callback:Function;
    private errorhandle:Function;
    private accept:string;
    private _ismultiple:Boolean=false;
    private outputoption:OUTOUTTYPE [];
    constructor(ismultiple:Boolean=false){
        
        this._ismultiple = ismultiple;
        this.accept = ".*"; 
        this.initInput();
        if(window.hasOwnProperty('File') && window.hasOwnProperty('FileReader') && window.hasOwnProperty('FileList') && window.hasOwnProperty('Blob'))
        {
            console.log("Great success! All the File APIs are supported.");
            /*this.file = new FileReader();
            this.file.onload =(e:{})=>{
                //console.log('uploaded');
                //this.dispatchEvent(new MF_EVENT.Event('fileloaded',e.target.result));
                //初始化input标签，
                //this.initInput();
                if(this.callback){
                    this.callback.call(null,)
                }
            }*/
        } else {
            console.log('The File APIs are not fully supported in this browser.');
            alert("你使用的浏览器不支持文件本地上传。请更新你的浏览器");
            //return;
        };
       
        //初始化input标签，
       
    }
    protected initInput()
    {
        this.input=null;
        this.input = document.createElement('input');
        this.input.type = 'file';
        this.input.accept = this.accept;
        //document.body.appendChild(this.input);
        if(this.ismultiple){
            this.input.setAttribute('multiple','multiple')
        }
        
        this.input.onchange=(e:InputEvent)=>{
            this.fileSelect(e);
        };
    }
    public get ismultiple():Boolean{
        return this._ismultiple
    }
    public set ismultiple(val:Boolean){
        this._ismultiple = val;
        if(val && this.input){
            this.input.setAttribute('multiple',"multiple")
        }else if(!val && this.input){
            this.input.removeAttribute('multiple');
        }
    }
    public setMultiple(val:Boolean):shinfileinput{
        this.ismultiple = val;
        return this;
    }
    protected fileSelect(e:InputEvent){
        //var target:HTMLInputElement= e.target || window.event.srcElement;
        let filedatas:FileList=this.input.files;
        
        //如果重复提交同一个文件，不用再次读取。直接返回即可。
        let outputset:Set<OUTOUTTYPE> = new Set(this.outputoption);
        let promises:Promise<any []> [] =[];
        for(let i:number=0;i<filedatas.length;i++){
            let file:File = filedatas[i];
            
            if(!file){
                console.log('没有选择文件');
                return
            }
            else{
                //this.file.readAsDataURL(file);
                //console.log('载入VFILE资源');
                promises.push(this.startReadFile(file,outputset));
            }
        }
        Promise.all(promises).then((res:{}[])=>{
           
            if(this.callback){
                this.callback.call(null,res);
            };
            this.initInput();
        })
        
        
    }
    protected startReadFile(file:File,options:Set<OUTOUTTYPE>):Promise<any []>{
        console.log('startload');
        const readfile =(option:OUTOUTTYPE)=>{
           
            return new Promise((ros,jet)=>{
                let filereader:FileReader = new FileReader();
          
                filereader.onload = (e:{})=>{
                    ros({
                        data:filereader.result,type:option
                    });
                };
                switch(option){
                    case OUTOUTTYPE.BASE64:filereader.readAsDataURL(file);break;
                    case OUTOUTTYPE.BUFFRR:filereader.readAsArrayBuffer(file);break;
                    case OUTOUTTYPE.TEXT:filereader.readAsText(file);break;
                }
                
            })
            
        }
        return new Promise( (ros,jet)=>{
            let arr:any [] =[];
            options.forEach(async (option)=>{
                console.log({option});
                let result:any = await readfile(option);
                
                arr.push(result);
            })
            ros(arr);
            
        })
    }
    protected loadFile(filters:string,callback:Function,errorhandle:Function)
    {
        //console.log(this.input);
        this.callback = callback;
        this.errorhandle = errorhandle;
        if(filters)
        {
            this.input.accept=filters;
        }
        //console.log(this.input);
        if(document.all)
        {
            this.input.click();
        }
        else
        {
            let e:MouseEvent=document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            this.input.dispatchEvent(e);
        }
    }
  
    public start(filters:string,outputoption:OUTOUTTYPE []):Promise<Function>{
        this.outputoption = outputoption || [OUTOUTTYPE.BASE64]
        return new Promise((res,jet)=>{
            this.loadFile(filters,res,jet)
        });
    }
}
