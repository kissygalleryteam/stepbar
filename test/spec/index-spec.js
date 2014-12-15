KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('stepbar', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','kg/stepbar/2.1.0/']});