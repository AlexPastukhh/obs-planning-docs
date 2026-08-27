package obs.rpkg;

import java.util.*;

final class ReviewChatTitleMatcher {
    private ReviewChatTitleMatcher(){}

    static boolean matches(String requestedTitle,String actualTitle,String ignoredCharacters){
        return normalize(requestedTitle,ignoredCharacters).equals(normalize(actualTitle,ignoredCharacters));
    }

    static String normalize(String title,String ignoredCharacters){
        if(title==null)return "";
        Set<Integer> ignored=new HashSet<>();
        if(ignoredCharacters!=null)ignoredCharacters.codePoints().forEach(ignored::add);
        StringBuilder out=new StringBuilder();
        title.codePoints().filter(cp->!ignored.contains(cp)).forEach(out::appendCodePoint);
        return out.toString().trim();
    }
}
