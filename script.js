// Wait for the document to load before running the script 
(function ($) {
  
  let $inputs = [1,2,3,4,5].map(x => $(`#word${x}`))
  let $result = $('#result')

  let updateResult = () => {
    console.log('updateResult')
    $result.val(`Starting...`)
    let startTicks = new Date().getTime()
    try {
      let filterStrs = $inputs.map($input => $input.val()).filter(x => !!x)
      console.log('filterStrs', filterStrs)
  
      let applyFilterStr = (words, filterStr) => {
        console.log('applyFilterStr', filterStr)
        // ар!буз? 
        // !word.includes('а')
        // word[1] = 'р'
        // !word.includes('б')
        // !word.includes('у')
        // word[4] != 'з'
        // word.includes('з')
        
        let rules = []

        let createRuleIncludes = letter => word => word.includes(letter)
        let createRuleNotIncludes = letter => word => !word.includes(letter)
        let createRuleExact = (letter, index) => word => word[index] === letter
        let createRuleNotExact = (letter, index) => word => word[index] !== letter

        let index = 0
        let filter = filterStr.toLowerCase()
        while (filter){
          let letter = filter[0]
          let nextLetter = filter[1]
          if(nextLetter === '!') {
            rules.push(createRuleExact(letter, index))
            filter = filter.substring(2)
          }
          else if(nextLetter === '?') {
            rules.push(createRuleNotExact(letter, index))
            rules.push(createRuleIncludes(letter))
            filter = filter.substring(2)
          }
          else {
            rules.push(createRuleNotIncludes(letter))
            filter = filter.substring(1)
          }

          index++
        }   
        
        console.log('rules', rules)     

        let isFitToFilter = word => rules.every(rule => rule(word))
        
        let result = words.filter(isFitToFilter)
        console.log('result', result)     

        return result
      }

      let resultWords = filterStrs.reduce(applyFilterStr, words5Array)
      console.log('resultWords', resultWords)     
      let resultStr = resultWords.slice(0, 20).join('\n')
      console.log('resultStr', resultStr)     

      let endTicks = new Date().getTime()
	  let periodMs = endTicks - startTicks
      $result.val(`Found ${resultWords.length} words for ${periodMs}ms\n${resultStr}`)
    }
    catch (e) {
      $result.val(`Error: ${e}`)
    }
  }

  let timer = 0
  let scheduleUpdate = () => {
    clearTimeout(timer)
    timer = setTimeout(updateResult, 100)
  }

  $inputs.map($input => $input.on('input', scheduleUpdate))
  updateResult()

})(jQuery);
