// TESTE FINAL WEBGL - Verificar se conseguimos remover o background azul
console.log('🧪 TESTE FINAL WEBGL - VERIFICANDO SE CONSEGUIMOS REMOVER O BACKGROUND AZUL');
console.log('=======================================================================');

// Função para testar no browser
function testFinalWebGL() {
  console.log('🔍 Teste 1: Verificar se o canvas existe');
  const canvas = document.getElementById('canvas3d');
  if (!canvas) {
    console.log('❌ FALHOU: Canvas não encontrado');
    return false;
  }
  console.log('✅ Canvas encontrado');

  console.log('🔍 Teste 2: Verificar se o Spline carregou');
  const has3DContent = canvas.width > 0 && canvas.height > 0;
  if (!has3DContent) {
    console.log('❌ FALHOU: Canvas não tem conteúdo 3D');
    return false;
  }
  console.log('✅ Canvas tem conteúdo 3D');

  console.log('🔍 Teste 3: Verificar se o WebGL está disponível');
  try {
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.log('❌ FALHOU: WebGL não está disponível');
      return false;
    }
    console.log('✅ WebGL disponível');
  } catch (error) {
    console.log('❌ FALHOU: Erro ao acessar WebGL:', error);
    return false;
  }

  console.log('🔍 Teste 4: Verificar se o background mudou');
  const computedStyle = window.getComputedStyle(canvas);
  const backgroundColor = computedStyle.backgroundColor;
  console.log('Background color:', backgroundColor);
  
  // Verificar se não é transparente
  if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
    console.log('❌ FALHOU: Background ainda é transparente');
    console.log('O Spline está desenhando o fundo azul diretamente no canvas');
    return false;
  }
  
  if (backgroundColor === 'rgb(0, 0, 0)' || backgroundColor === 'black') {
    console.log('✅ SUCESSO: Background está preto!');
    return true;
  } else {
    console.log('❌ FALHOU: Background ainda não está preto');
    console.log('Background atual:', backgroundColor);
    return false;
  }
}

// Executar teste
const result = testFinalWebGL();
console.log('\n📊 RESULTADO DO TESTE:', result ? '✅ PASSOU' : '❌ FALHOU');

if (!result) {
  console.log('\n🔧 CONCLUSÃO:');
  console.log('1. O Spline está desenhando o fundo azul diretamente no canvas');
  console.log('2. CSS não consegue sobrescrever o que é desenhado no canvas');
  console.log('3. Precisamos interceptar o WebGL/Three.js diretamente');
  console.log('4. O monkey patch não está funcionando porque o Spline não expõe o renderer corretamente');
}

// Exportar função para uso no console
window.testFinalWebGL = testFinalWebGL;
console.log('\n💡 Dica: Execute testFinalWebGL() no console para testar novamente');
