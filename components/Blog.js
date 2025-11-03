
const { Route, Switch, useRouteMatch, useParams } = ReactRouterDOM;

const { useEffect, useState, useMemo, useRef } = React;

export { Blog }


// ----------------------------------------------------------------------------------------->


function Blog({id: id}) {

    const [postIds,setPostIds] = useState([])
    const [postsPerPage,setPostsPerPage] = useState (0)

    useMemo( () => {
        import('../data/blogposts/postlist.js').then( (i)=>{        
            setPostIds([...i.posts.postIds])
            setPostsPerPage(i.posts.postsPerPage)
            })
    },[])

    let match = useRouteMatch();

    return postsPerPage == 0 ? '' : (
        React.createElement(Switch, null, React.createElement(Route, {
            path: `${match.path}/:type/:id`
        }, React.createElement(Post, {
            postIds: postIds,
            postsPerPage: postsPerPage
        })), React.createElement(Route, {
            path: `/`
        }, React.createElement(Post, {
            postIds: postIds,
            postsPerPage: postsPerPage
        })))
    );
}


// ----------------------------------------------------------------------------------------->


function Post ({postIds:postIds, postsPerPage:postsPerPage}){

    let { type, id } = useParams();
    if (!type)
        type = 'q'
    if (!id)
        id = 1

    // ---------------------------------->

    const [postsData, setPostsData] = useState([])

    function getIds(typ, start, id){
        let targ = (typ == 'p') ? id : (start == 'start' ?  (+id - 1) * postsPerPage + 1 : +id * postsPerPage)
        targ = Math.max(1, targ)
        targ = Math.min(postIds.length, targ)
        return targ
    }

    const startId = useMemo( () => {
        return getIds(type, 'start', id) 
    },[type,id])

    const endId = useMemo( () => {
        return getIds(type, 'end', id) 
    },[type,id])

    useMemo( async ()=> {
        let postList = []
        for( let i = startId; i < +endId + 1; i++){
            await import('../data/blogposts/'+i+'.js').then( (post) => {
                postList.push({title: post.item.title, date: post.item.date, content: post.item.content})
            })
        }
        setPostsData(postList)
    },[type,id])
    
    // ---------------------------------->

    const pageList = [...Array(Math.ceil(postIds.length / postsPerPage)).keys()]

    function getURL(page){
        let targ = Math.max(1, page)
        targ = Math.min(targ, pageList.length)
        return '#blog/'+type+'/'+targ
    }

    // ---------------------------------->

    return (
        React.createElement(React.Fragment, null, postsData.map((post, index) => React.createElement("div", {
            className: "card-display",
            key: +index + 1
        }, React.createElement("a", {
            href: type == 'q' ? '#blog/p/' + String((+id - 1) * postsPerPage + index + 1) : '#blog/q/' + Math.ceil(id / postsPerPage)
        }, React.createElement("h2", {
            className: "card-title " + (type == 'p' ? 'card-title-indented' : '')
        }, post.title)), React.createElement("div", {
            className: 'card-date ' + (type == 'p' ? 'card-date-indented' : '')
        }, post.date), React.createElement(Content, {
            rawHtml: post.content,
            key: type + id + index,
            type: type
        }))), type == 'q' && React.createElement("div", {
            class: "page"
        }, React.createElement("div", null, React.createElement("a", {
            href: getURL(+id - 1)
        }, '<<')), pageList.map(page => React.createElement("div", {
            class: page == +id - 1 ? 'currentpage' : ''
        }, React.createElement("a", {
            href: getURL(+page + 1)
        }, +page + 1))), React.createElement("div", null, React.createElement("a", {
            href: getURL(+id + 1)
        }, '>>'))), type == 'p' && React.createElement("div", {
            class: "page"
        }, React.createElement("div", null, React.createElement("a", {
            href: '#blog/q/' + Math.ceil(id / postsPerPage)
        }, '<< 返回列表'))))
    )
}


// ----------------------------------------------------------------------------------------->


function Content({rawHtml:rawHtml, key:key, type:type}){

    const [isHidden, setIsHidden] = useState(true)
    const [maxHeight, setMaxHeight] = useState(300)
    const [expansionOpacity, setExpansionOpacity] = useState(1)
    const [hiddingOpacity, setHiddingOpacity] = useState(0)

    const [scrollHeight, setScrollHeight] = useState(300)
    const [isShowMoreShown, setIsShowMoreShown] = useState(false)
    const [duration, setDuration] = useState(0.5)

    const contentBody = useRef()

    // ---------------------------------->

    const contentBoxStyle = {
        maxHeight: maxHeight,
        transition : 'max-height '+duration+'s ease-in-out'
    }

    const showMoreStyle = {
        width: '28px',
        padding: '15px calc(50% - 14px)',
        cursor: 'pointer',
    }

    const expandingStyle = {
        opacity: expansionOpacity,
        position: 'absolute', 
        transition: 'opacity 0.1s linear 0.1s',
    }

    const hidingStyle = {
        opacity: hiddingOpacity,
        transition: 'opacity 0.1s linear 0.1s',
    }

    // ---------------------------------->

    function expansionSwitcher(){
        if (isShowMoreShown){
            setMaxHeight( isHidden ? String(scrollHeight)+'px' : '300px')
            setExpansionOpacity( isHidden ? '0' : '1')
            setHiddingOpacity( isHidden ? '1' : '0')
            setIsHidden( !isHidden )
        }
    }

    useEffect( () => {
        var measureScrollHeight = contentBody.current.scrollHeight
        if( type == 'p'){
            setMaxHeight(measureScrollHeight)
        }
        else{
            setScrollHeight(measureScrollHeight)
            if (measureScrollHeight > 300){
                setIsShowMoreShown(true)
                setDuration(scrollHeight > 200 ? 0.2 + (scrollHeight - 200)/3000 : 0.2)
            }
            else
                setIsShowMoreShown(false)
        }
    },[rawHtml,key])

    // ---------------------------------->

    return (
        React.createElement(React.Fragment, null, React.createElement("div", {
            style: contentBoxStyle,
            key: key,
            className: 'card-text ' + (type == 'p' ? 'card-text-indented' : ''),
            ref: contentBody,
            onClick: expansionSwitcher,
            dangerouslySetInnerHTML: {
            __html: rawHtml
            }
        }), isShowMoreShown && React.createElement("div", {
            style: {
            display: 'flex',
            justifyContent: 'center'
            }
        }, React.createElement("div", {
            style: showMoreStyle,
            onClick: expansionSwitcher
        }, React.createElement("div", {
            style: expandingStyle
        }, React.createElement("img", {
            width: "28px",
            height: "28px",
            src: "./data/img/pull.svg",
            alt: "Quiet"
        })), React.createElement("div", {
            style: hidingStyle
        }, React.createElement("img", {
            width: "28px",
            height: "28px",
            src: "./data/img/push.svg",
            alt: "Quiet"
        })))))
    )
}


