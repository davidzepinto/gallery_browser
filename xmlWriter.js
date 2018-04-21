function createRoot(XML, RootName){
    XML.BeginNode(RootName);
}


function getCategorys(XML, RootName){
    for each (var file in files){
        if(!file.includes(".")){ //só assume sendo pasta os ficheiros que não contêm "."
            
            getImagesFromCat(XML, RootName + '/' + file + '/');
        }
    }
}


function getImagesFromCat(XML, CategoryPath){
    
    //TODO
}


function getImage(Image){
    //TODO
}


function createXML(RootName){
    var XML = new XMLWriter();
    createRoot(XML, RootName);
    
    var fs = require('fs');
    var files = fs.readdirSync('./' + RootName + '/');
    
    getCategorys(XML, RootName);
    
    //TODO
    
    
    XML.endNode();
    XML.close();
    
    //Escreve ficheiro xml
    var xmlString = XML.ToString();
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "text/xml");
}


//main para actualizar temas individuais
function main(RootName){
    createXML(RootName);
}


//main para actualizar todos os temas
function main(){
    var fs = require('fs');
    var files = fs.readdirSync('.');
    
    for each (var file in files){
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