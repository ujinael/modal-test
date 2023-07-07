import {type Directive } from "vue"

export const phoneMask:Directive = {
    mounted(el:CleanableInput, binding) {
      
      let mask:string = binding.value
         let first = mask.indexOf('_')
         let fieldsL = mask.replace(/[^_]/gm, '').length
         let clean = mask.replace(/[^0-9_]/gm, '')
         let indexes:number[] = []
          
      for(let i = 0; i < clean.length; i++){
        if(!isNaN(+clean[i])){
          indexes.push(i)
        }
      }
      
      el.value = mask
      el.clean = mask.replace(/[^0-9]/gm, '')
      
      function maskIt(event:Event, start:number){
        let value = el.value,
            filtred = value.replace(/[^0-9]/gm, ''),
            result = ''
        
        if(value.length < first){
          value = mask + value
          filtred = value.replace(/[^0-9]/gm, '')
        }
        
        for(var i = 0; i < filtred.length; i++){
          if(indexes.indexOf(i) == -1){
            result += filtred[i]
          }
        }
        
        value = ''
        let cursor = 0
        
        for(let i = 0; i < mask.length; i++){
          if(mask[i] == '_' && result){
            value += result[0]
            result = result.slice(1)
            cursor = i + 1
  
          }else{
            value += mask[i]
          }
        }
   
        if(cursor < first){
          cursor = first
        }
        
        el.value = value
        
        el.clean = el.value.replace(/[^0-9]/gm, '')
        el.setSelectionRange(cursor,cursor)
      }
      
      el.addEventListener('focus', function(event){
        event.preventDefault()
      })
      
      el.addEventListener('click', function(event){
        event.preventDefault()
        var start = el.value.indexOf('_')
        
        if(start == -1){
          start = el.value.length
        }
        
        el.setSelectionRange(start,start)
        
      })
      
      el.addEventListener('paste', function(event){
        let start = el.selectionStart
        
        if(start && start < first){
          el.value = '_' + el.value
        }
      })
      
      el.addEventListener('input', function(event){
        let start = el.selectionStart     
        if (start) 
        maskIt(event, start)
      })
      
    }
  }
  interface CleanableInput extends HTMLInputElement{
    clean:string
  }