function createRoot(XML, RootName){
    XML.BeginNode(RootName);
}


function getCategorys(XML, RootName){
    var fs = require('fs');
    var files = fs.readdirSync('./' + RootName + '/');
    
    for (var file in files){
        if(!file.includes(".")){ //só assume sendo pasta os ficheiros que não contêm "."
            XML.BeginNode("file");
            XML.Attrib("Category", file);
            
            getImagesFromCat(XML, RootName + '/' + file + '/');
            
            XML.EndNode();
        }
    }
}


function getImagesFromCat(XML, CategoryPath){
    var fs = require('fs');
    var images = fs.readdirSync('./' + CategoryPath);
    
    for (var image in images){
        if(file.includes(".jpeg") || file.includes(".jpg") ){
            XML.BeginNode("img");
            XML.Attrib("", './' + CategoryPath + image + '/');
            XML.WriteString(image);        
            XML.EndNode();
        }
    }
}
    

function createXML(RootName){
    var XML = new XMLWriter();
    createRoot(XML, RootName);
    
    getCategorys(XML, RootName);    
    
    XML.EndNode();
    XML.Close();
    
    //Escreve ficheiro xml
    var xmlString = XML.ToString();
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "text/xml");
}

    

//=============== MAINS ===================
    
//main para actualizar temas individuais
function main(RootName){
    createXML(RootName);
}


//main para actualizar todos os temas
function main(){
    var fs = require('fs');
    var files = fs.readdirSync('.');
    
    for (var file in files){
        if(!file.includes(".")){ //só assume sendo pasta os ficheiros que não contêm "."
            main(file);
        }
    } 
}







//================== Classe que escreve o XML ===================

function XMLWriter()
{
    this.XML=[];
    this.Nodes=[];
    this.State="";
    this.FormatXML = function(Str)
    {
        if (Str)
            return Str.replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return ""
    }
    this.BeginNode = function(Name)
    {
        if (!Name) return;
        if (this.State=="beg") this.XML.push(">");
        this.State="beg";
        this.Nodes.push(Name);
        this.XML.push("<"+Name);
    }
    this.EndNode = function()
    {
        if (this.State=="beg")
        {
            this.XML.push("/>");
            this.Nodes.pop();
        }
        else if (this.Nodes.length>0)
            this.XML.push("</"+this.Nodes.pop()+">");
        this.State="";
    }
    this.Attrib = function(Name, Value)
    {
        if (this.State!="beg" || !Name) return;
        this.XML.push(" "+Name+"=\""+this.FormatXML(Value)+"\"");
    }
    this.WriteString = function(Value)
    {
        if (this.State=="beg") this.XML.push(">");
        this.XML.push(this.FormatXML(Value));
        this.State="";
    }
    this.Node = function(Name, Value)
    {
        if (!Name) return;
        if (this.State=="beg") this.XML.push(">");
        this.XML.push((Value=="" || !Value)?"<"+Name+"/>":"<"+Name+">"+this.FormatXML(Value)+"</"+Name+">");
        this.State="";
    }
    this.Close = function()
    {
        while (this.Nodes.length>0)
            this.EndNode();
        this.State="closed";
    }
    this.ToString = function(){return this.XML.join("");}
}